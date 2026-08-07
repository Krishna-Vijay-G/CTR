import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { media } from "@/db/schema";

const f = createUploadthing();

/** Shared auth middleware — every route rejects non-admins. */
async function authorize() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== "admin") {
    throw new UploadThingError("Unauthorized");
  }
  return { userId: session.user.id };
}

export const ourFileRouter = {
  // Driver headshots & article cover images.
  imageUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(() => authorize())
    .onUploadComplete(async ({ metadata, file }) => {
      await db.insert(media).values({
        key: file.key,
        url: file.ufsUrl,
        name: file.name,
        type: "image",
        sizeBytes: file.size,
        uploadedBy: metadata.userId,
      });
      return { url: file.ufsUrl, key: file.key };
    }),

  // 3D car assets (.glb / .gltf). Uploadthing has no native "model"
  // type, so we accept it via the generic "blob" route with a size cap.
  modelUploader: f({
    blob: { maxFileSize: "32MB", maxFileCount: 1 },
  })
    .middleware(async ({ files }) => {
      const ctx = await authorize();
      const bad = files.find(
        (file) => !/\.(glb|gltf)$/i.test(file.name),
      );
      if (bad) {
        throw new UploadThingError("Only .glb or .gltf files are allowed");
      }
      return ctx;
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await db.insert(media).values({
        key: file.key,
        url: file.ufsUrl,
        name: file.name,
        type: "model",
        sizeBytes: file.size,
        uploadedBy: metadata.userId,
      });
      return { url: file.ufsUrl, key: file.key };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
