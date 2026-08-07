// Shared, framework-agnostic types for Server Actions.
// Kept out of "use server" files, which may only export async functions.
export type ActionState = {
  ok: boolean;
  message?: string;
  fieldErrors?: Record<string, string[]>;
};
