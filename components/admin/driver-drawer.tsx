"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { createDriver } from "@/actions/drivers";
import type { ActionState } from "@/actions/types";
import { Sheet } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UploadField } from "@/components/admin/upload-field";
import { SubmitButton } from "@/components/admin/submit-button";

const initial: ActionState = { ok: false };

export function DriverDrawer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [state, formAction] = useActionState(createDriver, initial);

  useEffect(() => {
    if (state.ok && state.message) {
      toast.success(state.message);
      onOpenChange(false);
    } else if (!state.ok && state.message) {
      toast.error(state.message);
    }
  }, [state, onOpenChange]);

  const err = state.fieldErrors ?? {};

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
      title="Add New Driver"
      description="Add a driver to the roster."
    >
      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" name="name" placeholder="Driver name" />
          {err.name && <p className="text-xs text-red-400">{err.name[0]}</p>}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="carNumber">Car number</Label>
            <Input
              id="carNumber"
              name="carNumber"
              type="number"
              min={0}
              max={999}
              placeholder="7"
            />
            {err.carNumber && (
              <p className="text-xs text-red-400">{err.carNumber[0]}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              name="category"
              defaultValue="F4"
              className="flex h-9 w-full rounded-md border border-[var(--border)] bg-[var(--card)] px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
            >
              <option value="F4">F4</option>
              <option value="IRL">IRL</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio (optional)</Label>
          <Textarea id="bio" name="bio" rows={3} />
        </div>

        <UploadField
          endpoint="imageUploader"
          name="headshotUrl"
          label="Headshot photo"
        />

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="active"
            value="true"
            defaultChecked
            className="size-4 accent-[var(--primary)]"
          />
          Active on current roster
        </label>

        <SubmitButton className="w-full">Save driver</SubmitButton>
      </form>
    </Sheet>
  );
}
