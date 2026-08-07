import Link from "next/link";
import { count as countRows } from "drizzle-orm";
import { Newspaper, Users, Gauge, Images } from "lucide-react";
import { db } from "@/db";
import { articles, drivers, raceEvents, media } from "@/db/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

async function tableCount(
  table: typeof articles | typeof drivers | typeof raceEvents | typeof media,
) {
  const [row] = await db.select({ n: countRows() }).from(table);
  return row?.n ?? 0;
}

export default async function DashboardHome() {
  const [articleCount, driverCount, raceCount, mediaCount] = await Promise.all([
    tableCount(articles),
    tableCount(drivers),
    tableCount(raceEvents),
    tableCount(media),
  ]);

  const stats = [
    { label: "Articles", value: articleCount, icon: Newspaper, href: "/admin/dashboard/articles" },
    { label: "Drivers", value: driverCount, icon: Users, href: "/admin/dashboard/drivers" },
    { label: "Race events", value: raceCount, icon: Gauge, href: "/admin/dashboard/stats" },
    { label: "Media files", value: mediaCount, icon: Images, href: "/admin/dashboard/media" },
  ];

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold">Overview</h1>
      <p className="mb-8 text-sm text-[var(--muted)]">
        Manage CTR content, drivers, machine specs and media.
      </p>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, href }) => (
          <Link key={label} href={href}>
            <Card className="transition-colors hover:border-[var(--primary)]">
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="text-sm text-[var(--muted)]">
                  {label}
                </CardTitle>
                <Icon className="size-4 text-[var(--muted)]" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{value}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
