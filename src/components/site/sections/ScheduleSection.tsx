import { MapPin } from "lucide-react";
import { CountdownTimer } from "@/components/site/CountdownTimer";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { eventDateLabel, eventDateParts, eventIsPast, eventStart, nextEventIndex } from "@/lib/raceDates";
import { currentPublishedSeason } from "@/lib/server/seasonsRepo";
import { getRootSite } from "@/lib/server/sitesRepo";
import { getTrack } from "@/lib/server/tracksRepo";

/**
 * The calendar on the home page.
 *
 * Reads the same season the /schedule page reads, so the two can never
 * disagree about which round is next. Nothing published yet: the band goes
 * rather than announcing a calendar that does not exist.
 */
export async function ScheduleSection() {
  const site = await getRootSite();
  const now = new Date();
  const current = await currentPublishedSeason(site.id, now);
  const events = current?.events ?? [];

  if (!current || events.length === 0) return null;

  const upcoming = events[nextEventIndex(events, now)];
  const track = upcoming?.track_id ? await getTrack(upcoming.track_id) : null;
  const startsAt = upcoming ? eventStart(upcoming) : null;

  return (
    <section id="schedule" className="relative border-t border-white/10 bg-carbon-900/40 py-20 md:py-28">
      <div className="section-container">
        <SectionHeading
          index="04"
          label={current.season.name}
          title="Race Calendar"
          action={{ href: "/schedule", label: "Full calendar" }}
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          {/* Next round */}
          {upcoming ? (
            <Reveal className="relative overflow-hidden bg-carbon-950">
              {track?.photo_url ? (
                <img
                  src={track.photo_url}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover opacity-30 grayscale"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-carbon-950 via-carbon-950/80 to-carbon-950/40" />
              <div className="relative flex h-full flex-col justify-between gap-10 p-6 md:p-8">
                <div>
                  <span className="inline-block bg-racing-yellow px-2 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-carbon-950">
                    Next race{upcoming.round ? ` · Round ${upcoming.round}` : ""}
                  </span>
                  <h3 className="heading-font mt-5 text-4xl font-bold uppercase leading-[0.92] text-white md:text-5xl">
                    {upcoming.title || track?.name || upcoming.venue}
                  </h3>
                  <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-carbon-200">
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
          <Reveal delay={0.1} as="div">
            <ol className="divide-y divide-white/10 border-y border-white/10">
              {events.map((event, i) => {
                const isNext = event.id === upcoming?.id;
                const past = eventIsPast(event, now);
                const parts = eventDateParts(event);
                return (
                  <li
                    key={event.id}
                    className={`grid grid-cols-[3rem_1fr_auto] items-center gap-4 py-4 md:grid-cols-[4rem_1fr_auto] ${
                      past ? "opacity-50" : ""
                    }`}
                  >
                    <span
                      className={`heading-font text-3xl font-bold tabular-nums leading-none ${
                        isNext ? "text-racing-yellow" : "text-carbon-400"
                      }`}
                    >
                      {event.round || String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <p className="heading-font truncate text-lg font-bold uppercase leading-tight text-white md:text-xl">
                        {event.title || event.venue}
                      </p>
                      <p className="truncate text-xs text-carbon-400">
                        {event.subtitle || event.city}
                        {event.badge ? <span className="ml-2 text-racing-yellow">· {event.badge}</span> : null}
                      </p>
                    </div>
                    <div className="text-right">
                      {parts ? (
                        <>
                          <p className="heading-font text-lg font-bold tabular-nums leading-none text-white">
                            {parts.days}
                          </p>
                          <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-carbon-400">
                            {parts.month}
                          </p>
                        </>
                      ) : (
                        <p className="text-[10px] uppercase tracking-[0.25em] text-carbon-400">TBC</p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
