"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Plus, Trash2, User } from "lucide-react";
import type { Driver } from "@/db/schema";
import { deleteDriver } from "@/actions/drivers";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DriverDrawer } from "@/components/admin/driver-drawer";

export function DriverTable({ drivers }: { drivers: Driver[] }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function onDelete(d: Driver) {
    if (!confirm(`Remove driver "${d.name}"?`)) return;
    startTransition(async () => {
      await deleteDriver(d.id);
      toast.success("Driver removed");
    });
  }

  return (
    <>
      <div className="mb-4 flex justify-end">
        <Button onClick={() => setOpen(true)}>
          <Plus className="size-4" />
          Add New Driver
        </Button>
      </div>

      <Card className="overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-[var(--border)] text-left text-[var(--muted)]">
            <tr>
              <th className="p-3 font-medium">Driver</th>
              <th className="p-3 font-medium">No.</th>
              <th className="p-3 font-medium">Category</th>
              <th className="p-3 font-medium">Status</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {drivers.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="p-6 text-center text-[var(--muted)]"
                >
                  No drivers yet. Add your first driver.
                </td>
              </tr>
            ) : (
              drivers.map((d) => (
                <tr
                  key={d.id}
                  className="border-b border-[var(--border)] last:border-0"
                >
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      {d.headshotUrl ? (
                        <Image
                          src={d.headshotUrl}
                          alt={d.name}
                          width={36}
                          height={36}
                          className="size-9 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex size-9 items-center justify-center rounded-full bg-black/40">
                          <User className="size-4 text-[var(--muted)]" />
                        </div>
                      )}
                      <span className="font-medium">{d.name}</span>
                    </div>
                  </td>
                  <td className="p-3 font-mono">#{d.carNumber}</td>
                  <td className="p-3">
                    <Badge className="border-[var(--primary)] text-[var(--primary)]">
                      {d.category}
                    </Badge>
                  </td>
                  <td className="p-3">
                    <span
                      className={
                        d.active ? "text-green-400" : "text-[var(--muted)]"
                      }
                    >
                      {d.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={isPending}
                      onClick={() => onDelete(d)}
                    >
                      <Trash2 className="size-4 text-red-400" />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>

      <DriverDrawer open={open} onOpenChange={setOpen} />
    </>
  );
}
