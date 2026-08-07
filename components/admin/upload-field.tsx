"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { X, FileBox } from "lucide-react";
import { UploadDropzone } from "@/lib/uploadthing";
import { Button } from "@/components/ui/button";

type Endpoint = "imageUploader" | "modelUploader";

export function UploadField({
  endpoint,
  name,
  label,
  defaultValue = "",
}: {
  endpoint: Endpoint;
  name: string; // hidden input name -> submitted with the form
  label: string;
  defaultValue?: string;
}) {
  const [url, setUrl] = useState(defaultValue);
  const isImage = endpoint === "imageUploader";

  return (
    <div className="space-y-2">
      <span className="text-sm font-medium">{label}</span>

      {/* Value travels with the surrounding <form> submission */}
      <input type="hidden" name={name} value={url} readOnly />

      {url ? (
        <div className="relative flex items-center gap-3 rounded-md border border-[var(--border)] p-3">
          {isImage ? (
            <Image
              src={url}
              alt="preview"
              width={56}
              height={56}
              className="size-14 rounded object-cover"
            />
          ) : (
            <FileBox className="size-10 text-[var(--primary)]" />
          )}
          <span className="flex-1 truncate text-xs text-[var(--muted)]">
            {url}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setUrl("")}
          >
            <X className="size-4" />
          </Button>
        </div>
      ) : (
        <UploadDropzone
          endpoint={endpoint}
          onClientUploadComplete={(res) => {
            const uploaded = res?.[0]?.serverData?.url ?? res?.[0]?.ufsUrl;
            if (uploaded) {
              setUrl(uploaded);
              toast.success("Upload complete");
            }
          }}
          onUploadError={(err) => {
            toast.error(err.message);
          }}
          appearance={{
            container:
              "border-[var(--border)] rounded-md p-4 ut-uploading:opacity-70",
            label: "text-[var(--foreground)] text-sm",
            allowedContent: "text-[var(--muted)] text-xs",
            button:
              "bg-[var(--primary)] text-white text-sm px-4 h-9 rounded-md after:bg-red-800",
          }}
        />
      )}
    </div>
  );
}
