"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { upsertMachineSpec, deleteMachineSpec } from "@/actions/stats";
import type { ActionState } from "@/actions/types";
import type { MachineSpec } from "@/db/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UploadField } from "@/components/admin/upload-field";
import { SubmitButton } from "@/components/admin/submit-button";

const initial: ActionState = { ok: false };

export function MachineSpecForm({ spec }: { spec?: MachineSpec }) {
  const action = upsertMachineSpec.bind(null, spec?.id ?? null);
  const [state, formAction] = useActionState(action, initial);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (state.message) {
      state.ok ? toast.success(state.message) : toast.error(state.message);
    }
  }, [state]);

  function onDelete() {
    if (!spec || !confirm("Delete this machine spec?")) return;
    startTransition(async () => {
      await deleteMachineSpec(spec.id);
      toast.success("Deleted");
    });
  }

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>{spec ? spec.carName : "New machine"}</CardTitle>
        {spec && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onDelete}
            disabled={isPending}
          >
            <Trash2 className="size-4 text-red-400" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor={`carName-${spec?.id}`}>Car name</Label>
            <Input
              id={`carName-${spec?.id}`}
              name="carName"
              defaultValue={spec?.carName ?? ""}
              placeholder="CTR-01"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-1.5">
              <Label htmlFor={`hp-${spec?.id}`}>HP</Label>
              <Input
                id={`hp-${spec?.id}`}
                name="horsepower"
                type="number"
                defaultValue={spec?.horsepower ?? ""}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor={`ts-${spec?.id}`}>Top km/h</Label>
              <Input
                id={`ts-${spec?.id}`}
                name="topSpeedKph"
                type="number"
                defaultValue={spec?.topSpeedKph ?? ""}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor={`wt-${spec?.id}`}>Weight kg</Label>
              <Input
                id={`wt-${spec?.id}`}
                name="weightKg"
                type="number"
                defaultValue={spec?.weightKg ?? ""}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor={`eng-${spec?.id}`}>Engine</Label>
            <Input
              id={`eng-${spec?.id}`}
              name="engine"
              defaultValue={spec?.engine ?? ""}
              placeholder="1.4L turbo inline-4"
            />
          </div>

          <UploadField
            endpoint="modelUploader"
            name="gltfModelUrl"
            label="3D model (.glb / .gltf)"
            defaultValue={spec?.gltfModelUrl ?? ""}
          />

          <SubmitButton size="sm">Save specs</SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
}
