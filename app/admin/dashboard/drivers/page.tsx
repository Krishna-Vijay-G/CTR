import { desc } from "drizzle-orm";
import { db } from "@/db";
import { drivers } from "@/db/schema";
import { DriverTable } from "@/components/admin/driver-table";

export default async function DriversPage() {
  const rows = await db.select().from(drivers).orderBy(desc(drivers.createdAt));

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold">Drivers</h1>
      <p className="mb-8 text-sm text-[var(--muted)]">
        Manage the IRL and Formula 4 roster.
      </p>
      <DriverTable drivers={rows} />
    </div>
  );
}
