import { desc, asc } from "drizzle-orm";
import { db } from "@/db";
import { machineSpecs, raceEvents } from "@/db/schema";
import { MachineSpecForm } from "@/components/admin/machine-spec-form";
import { RaceScheduleEditor } from "@/components/admin/race-schedule-editor";

export default async function StatsPage() {
  const [specs, events] = await Promise.all([
    db.select().from(machineSpecs).orderBy(desc(machineSpecs.updatedAt)),
    db.select().from(raceEvents).orderBy(asc(raceEvents.raceDate)),
  ]);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="mb-1 text-2xl font-bold">Race &amp; Machine</h1>
        <p className="text-sm text-[var(--muted)]">
          Update car telemetry, 3D assets and the race calendar.
        </p>
      </div>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
          Machine specs
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {specs.map((s) => (
            <MachineSpecForm key={s.id} spec={s} />
          ))}
          <MachineSpecForm /> {/* blank = create new */}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
          Race schedule
        </h2>
        <RaceScheduleEditor events={events} />
      </section>
    </div>
  );
}
