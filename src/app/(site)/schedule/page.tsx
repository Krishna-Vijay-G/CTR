import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Flag, Ruler, Compass, CornerUpRight } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { CountdownTimer } from "@/components/site/CountdownTimer";
import { eventDateLabel, eventStart, nextEventIndex } from "@/lib/raceDates";
import { currentPublishedSeason } from "@/lib/server/seasonsRepo";
import { getRootSite } from "@/lib/server/sitesRepo";
import { getTrack } from "@/lib/server/tracksRepo";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getRootSite();
  const current = await currentPublishedSeason(site.id);

  return {
    title: "Race Schedule",
    description: current
      ? `The complete ${current.season.name} race calendar for Chennai Turbo Riders.`
      : "The race calendar for Chennai Turbo Riders.",
  };
}

export default async function SchedulePage() {
  const site = await getRootSite();

  /*
   * One season's rounds, not every round ever run.
   *
   * `currentPublishedSeason` is where "which season is now" is decided, and it
   * hands back that season's events already filtered — so the January after
   * go-live this page shows the new year's calendar under the new year's name,
   * rather than both seasons in one list under a heading naming one of them.
   */
  const current = await currentPublishedSeason(site.id);
  const season = current?.season ?? null;
  const events = current?.events ?? [];

  /*
   * Which round is next, by the project's own rule rather than a second one
   * written here: `nextEventIndex` treats a weekend that is RUNNING as the next
   * one, not a past one, and falls back to the last round once the season is
   * over. A `find` on date_from would have called Sunday of a three-day meeting
   * "past" and pointed the countdown at next year.
   */
  const upcoming = events.length > 0 ? events[nextEventIndex(events, new Date())] : null;

  // The circuit behind the next round, for the feature block at the foot.
  const track = upcoming?.track_id ? await getTrack(upcoming.track_id) : null;
  const startsAt = upcoming ? eventStart(upcoming) : null;

  return (
    <>
      <PageHeader
        label={season?.name ?? "Calendar"}
        title="Race Calendar"
        description={season?.subtitle || "Every round of the season, as it stands."}
      />

      <div className="section-container py-16 md:py-20">
        {events.length === 0 ? (
          /* A season that has not been published yet. The page still exists —
             it is linked from the navigation — so it says what is true rather
             than 404ing on a route the header points at. */
          <p className="text-center text-carbon-300">
            The calendar has not been announced yet — check back shortly.
          </p>
        ) : (
          <>
            {/* Next race */}
            {upcoming ? (
              <Reveal className="relative mb-14 overflow-hidden rounded-2xl border border-racing-yellow/30 bg-gradient-to-br from-carbon-800 to-carbon-900 p-6 md:p-10">
                <div className="pointer-events-none absolute -right-10 -top-10 size-52 rounded-full bg-racing-yellow/10 blur-3xl" />
                <div className="grid items-center gap-8 md:grid-cols-2">
                  <div>
                    <span className="inline-block rounded bg-racing-yellow px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-carbon-950">
                      Next Race{upcoming.round ? ` · Round ${upcoming.round}` : ""}
                    </span>
                    <h2 className="heading-font mt-4 text-4xl font-bold uppercase text-white md:text-5xl">
                      {upcoming.title || track?.name || upcoming.venue}
                    </h2>
                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-carbon-300">
                      {upcoming.city || upcoming.venue ? (
                        <span className="flex items-center gap-1.5">
                          <MapPin className="size-4 text-racing-yellow" />
                          {upcoming.city || upcoming.venue}
                        </span>
                      ) : null}
                      <span className="flex items-center gap-1.5">
                        <Flag className="size-4 text-racing-yellow" />
                        {eventDateLabel(upcoming)}
                      </span>
                    </div>
                  </div>

                  {/* Only when the weekend has a fixed date — a countdown to
                      nothing is worse than no countdown. */}
                  {startsAt ? (
                    <CountdownTimer targetIso={startsAt.toISOString()} />
                  ) : null}
                </div>
              </Reveal>
            ) : null}

            {/* Full calendar */}
            <div className="grid gap-3">
              {events.map((event, i) => {
                const isNext = event.id === upcoming?.id;
                return (
                  <Reveal
                    key={event.id}
                    delay={i * 0.05}
                    className={`flex flex-wrap items-center gap-4 rounded-xl border px-5 py-4 md:px-6 ${
                      isNext
                        ? "border-racing-yellow/40 bg-racing-yellow/5"
                        : "border-white/10 bg-carbon-800/40"
                    }`}
                  >
                    <span className="heading-font w-12 text-3xl font-bold text-racing-yellow">
                      {event.round || String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-[180px] flex-1">
                      <p className="heading-font text-lg font-bold uppercase text-white">
                        {event.title || event.venue}
                      </p>
                      <p className="text-sm text-carbon-400">
                        {event.subtitle || event.city}
                      </p>
                    </div>

                    {/* One free-text chip, set per round in the console. It
                        replaces the fixed Night/Street pair the static data
                        carried: those were two booleans that could only ever say
                        two things, and a round is as likely to want "Double
                        Header" or "Season Finale". */}
                    {event.badge ? (
                      <span className="rounded bg-carbon-700 px-2 py-1 text-[10px] uppercase text-carbon-200">
                        {event.badge}
                      </span>
                    ) : null}

                    <span className="text-sm font-semibold text-white">
                      {eventDateLabel(event)}
                    </span>
                  </Reveal>
                );
              })}
            </div>

            {/* The circuit the next round runs at */}
            {track ? (
              <Reveal className="mt-16 overflow-hidden rounded-2xl border border-white/10 bg-carbon-800/40">
                <div className="grid md:grid-cols-2">
                  <div className="relative aspect-video md:aspect-auto">
                    {track.photo_url && (
                      <Image
                        src={track.photo_url}
                        alt={track.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="p-6 md:p-8">
                    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-racing-yellow">
                      The Circuit
                    </span>
                    <h3 className="heading-font mt-2 text-3xl font-bold uppercase text-white">
                      {track.name}
                    </h3>
                    {track.location ? (
                      <p className="mt-1 text-sm text-carbon-400">{track.location}</p>
                    ) : null}

                    {/* Each fact is dropped when the circuit has not been given
                        it, rather than printing a label over a blank. */}
                    <div className="mt-5 grid grid-cols-3 gap-4">
                      {track.length ? (
                        <div>
                          <Ruler className="mb-1 size-4 text-racing-yellow" />
                          <p className="heading-font text-xl font-bold text-white">
                            {track.length}
                          </p>
                          <p className="text-[11px] uppercase text-carbon-400">Length</p>
                        </div>
                      ) : null}
                      {track.turns ? (
                        <div>
                          <CornerUpRight className="mb-1 size-4 text-racing-yellow" />
                          <p className="heading-font text-xl font-bold text-white">
                            {track.turns}
                          </p>
                          <p className="text-[11px] uppercase text-carbon-400">Turns</p>
                        </div>
                      ) : null}
                      {track.direction ? (
                        <div>
                          <Compass className="mb-1 size-4 text-racing-yellow" />
                          <p className="heading-font text-xl font-bold text-white">
                            {track.direction}
                          </p>
                          <p className="text-[11px] uppercase text-carbon-400">Direction</p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </Reveal>
            ) : null}
          </>
        )}
      </div>
    </>
  );
}
