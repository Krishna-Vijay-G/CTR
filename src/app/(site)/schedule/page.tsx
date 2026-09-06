import type { Metadata } from "next";
import { Compass, CornerUpRight, MapPin, Ruler } from "lucide-react";
import { CountdownTimer } from "@/components/site/CountdownTimer";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { eventDateLabel, eventDateParts, eventIsPast, eventStart, nextEventIndex } from "@/lib/raceDates";
import { currentPublishedSeason } from "@/lib/server/seasonsRepo";
import { getRootSite } from "@/lib/server/sitesRepo";
import { getTrack } from "@/lib/server/tracksRepo";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getRootSite();
  const current = await currentPublishedSeason(site.id);

  return {
    title: "Race Calendar",
    description: current
      ? `The complete ${current.season.name} race calendar for Chennai Turbo Riders.`
      : "The race calendar for Chennai Turbo Riders.",
  };
}

export default async function SchedulePage() {
  const site = await getRootSite();
  const now = new Date();

  // One season's rounds, already filtered to "the season that is now".
  const current = await currentPublishedSeason(site.id, now);
  const season = current?.season ?? null;
  const events = current?.events ?? [];

  // A running weekend counts as next; after the finale, the last round stays.
  const upcoming = events.length > 0 ? events[nextEventIndex(events, now)] : null;
  const track = upcoming?.track_id ? await getTrack(upcoming.track_id) : null;
  const startsAt = upcoming ? eventStart(upcoming) : null;

  return (
    <>
      <PageHeader
        label={season?.name ?? "Calendar"}
        title="Race Calendar"
        description={season?.subtitle || "Every round of the season, as it stands."}
        aside={events.length > 0 ? `${events.length} rounds` : undefined}
      />

      <div className="section-container py-16 md:py-24">
        {events.length === 0 ? (
          <p className="border-y border-white/10 py-16 text-center text-carbon-300">
            The calendar has not been announced yet — check back shortly.
          </p>
        ) : (
          <>
            {/* Next race */}
            {upcoming ? (
              <Reveal className="relative overflow-hidden bg-carbon-900">
                {track?.photo_url ? (
                  <img
                    src={track.photo_url}
                    alt=""
                    loading="eager"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover opacity-30 grayscale"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-r from-carbon-950 via-carbon-950/85 to-carbon-950/50" />
                <div className="relative grid gap-10 p-6 md:grid-cols-2 md:items-end md:p-10">
                  <div>
                    <span className="inline-block bg-racing-yellow px-2 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-carbon-950">
                      Next race{upcoming.round ? ` · Round ${upcoming.round}` : ""}
                    </span>
                    <h2 className="heading-font mt-5 text-5xl font-bold uppercase leading-[0.9] text-white md:text-7xl">
                      {upcoming.title || track?.name || upcoming.venue}
                    </h2>
                    <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-carbon-200">
                      {upcoming.city || upcoming.venue ? (
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="size-4 text-racing-yellow" />
                          {upcoming.city || upcoming.venue}
                        </span>
                      ) : null}
                      <span>{eventDateLabel(upcoming)}</span>
                    </p>
                  </div>
                  {startsAt ? <CountdownTimer targetIso={startsAt.toISOString()} /> : null}
                </div>
              </Reveal>
            ) : null}

            {/* Rounds */}
            <ol className="mt-14 border-t border-white/10">
              {events.map((event, i) => {
                const isNext = event.id === upcoming?.id;
                const past = eventIsPast(event, now);
                const parts = eventDateParts(event);
                return (
                  <Reveal
                    key={event.id}
                    as="li"
                    delay={i * 0.04}
                    className={`grid grid-cols-[3.5rem_1fr_auto] items-center gap-4 border-b border-white/10 py-6 md:grid-cols-[6rem_1fr_auto_10rem] md:gap-8 ${
                      past ? "opacity-50" : ""
                    } ${isNext ? "bg-racing-yellow/[0.04]" : ""}`}
                  >
                    <span
                      className={`heading-font text-4xl font-bold tabular-nums leading-none md:text-6xl ${
                        isNext ? "text-racing-yellow" : "text-carbon-400"
                      }`}
                    >
                      {event.round || String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="min-w-0">
                      <p className="heading-font truncate text-2xl font-bold uppercase leading-tight text-white md:text-3xl">
                        {event.title || event.venue}
                      </p>
                      <p className="mt-1 truncate text-sm text-carbon-400">{event.subtitle || event.city}</p>
                    </div>

                    <div className="hidden md:block">
                      {event.badge ? (
                        <span className="border border-white/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-carbon-200">
                          {event.badge}
                        </span>
                      ) : isNext ? (
                        <span className="bg-racing-yellow px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-carbon-950">
                          Next
                        </span>
                      ) : past ? (
                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-carbon-400">
                          Complete
                        </span>
                      ) : null}
                    </div>

                    <div className="text-right">
                      {parts ? (
                        <>
                          <p className="heading-font text-2xl font-bold tabular-nums leading-none text-white md:text-3xl">
                            {parts.days}
                          </p>
                          <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-carbon-400">
                            {parts.month} {parts.year}
                          </p>
                        </>
                      ) : (
                        <p className="text-[10px] uppercase tracking-[0.25em] text-carbon-400">TBC</p>
                      )}
                    </div>
                  </Reveal>
                );
              })}
            </ol>

            {/* The circuit the next round runs at */}
            {track ? (
              <Reveal className="mt-20 grid gap-px border border-white/10 bg-white/10 md:grid-cols-2">
                <div className="relative aspect-[4/3] bg-carbon-900 md:aspect-auto">
                  {track.photo_url ? (
                    <img
                      src={track.photo_url}
                      alt={track.name}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : null}
                </div>
                <div className="bg-carbon-950 p-6 md:p-10">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-racing-yellow">
                    The circuit
                  </p>
                  <h3 className="heading-font mt-3 text-4xl font-bold uppercase leading-[0.92] text-white md:text-5xl">
                    {track.name}
                  </h3>
                  {track.location ? <p className="mt-2 text-sm text-carbon-400">{track.location}</p> : null}

                  <dl className="mt-8 grid grid-cols-3 divide-x divide-white/10 border-y border-white/10">
                    {[
                      { icon: Ruler, v: track.length, l: "Length" },
                      { icon: CornerUpRight, v: track.turns, l: "Turns" },
                      { icon: Compass, v: track.direction, l: "Direction" },
                    ].map((f, i) =>
                      f.v ? (
                        <div key={f.l} className={`py-4 ${i === 0 ? "pr-4" : "px-4"}`}>
                          <f.icon className="mb-2 size-4 text-racing-yellow" />
                          <dd className="heading-font text-2xl font-bold leading-none text-white">{f.v}</dd>
                          <dt className="mt-1 text-[10px] uppercase tracking-[0.25em] text-carbon-400">{f.l}</dt>
                        </div>
                      ) : null,
                    )}
                  </dl>
                </div>
              </Reveal>
            ) : null}
          </>
        )}
      </div>
    </>
  );
}
