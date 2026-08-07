"use client";

import { useActionState, useEffect, useRef, useTransition } from "react";
import { toast } from "sonner";
import { Trash2, Plus } from "lucide-react";
import { upsertRaceEvent, deleteRaceEvent } from "@/actions/stats";
import type { ActionState } from "@/actions/types";
import type { RaceEvent } from "@/db/schema";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/admin/submit-button";

const initial: ActionState = { ok: false };

// Formats a Date to the value a datetime-local input expects.
function toLocalInput(d: Date | null) {
  if (!d) return "";
  const off = d.getTimezoneOffset();
  return new Date(d.getTime() - off * 60000).toISOString().slice(0, 16);
}

function EventRow({ event }: { event?: RaceEvent }) {
  const action = upsertRaceEvent.bind(null, event?.id ?? null);
  const [state, formAction] = useActionState(action, initial);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok && state.message) {
      toast.success(state.message);
      if (!event) formRef.current?.reset(); // clear the "add new" row
    } else if (!state.ok && state.message) {
      toast.error(state.message);
    }
  }, [state, event]);

  function onDelete() {
    if (!event || !confirm("Delete this race event?")) return;
    startTransition(async () => {
      await deleteRaceEvent(event.id);
      toast.success("Deleted");
    });
  }

  return (
    <Card className="p-3">
      <form
        ref={formRef}
        action={formAction}
        className="grid grid-cols-1 items-end gap-2 md:grid-cols-[1.4fr_1.4fr_0.8fr_1.2fr_auto]"
      >
        <Input name="name" placeholder="Round 3 — Feature Race" defaultValue={event?.name ?? ""} />
        <Input name="circuit" placeholder="MMRT, Chennai" defaultValue={event?.circuit ?? ""} />
        <select
          name="category"
          defaultValue={event?.category ?? ""}
          className="h-9 rounded-md border border-[var(--border)] bg-[var(--card)] px-2 text-sm"
        >
          <option value="">—</option>
          <option value="F4">F4</option>
          <option value="IRL">IRL</option>
        </select>
        <Input
          name="raceDate"
          type="datetime-local"
          defaultValue={toLocalInput(event?.raceDate ?? null)}
        />
        <div className="flex gap-1">
          <SubmitButton size="sm" variant={event ? "outline" : "default"}>
            {event ? "Save" : <Plus className="size-4" />}
          </SubmitButton>
          {event && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onDelete}
              disabled={isPending}
            >
              <Trash2 className="size-4 text-red-400" />
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}

export function RaceScheduleEditor({ events }: { events: RaceEvent[] }) {
  return (
    <div className="space-y-3">
      {events.map((e) => (
        <EventRow key={e.id} event={e} />
      ))}
      <EventRow /> {/* add-new row */}
    </div>
  );
}
