import { Reveal } from "./Reveal";

export function SectionHeading({
  label,
  title,
  align = "left",
}: {
  label?: string;
  title: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal
      className={
        align === "center" ? "flex flex-col items-center text-center" : ""
      }
    >
      {label && (
        <div
          className={`mb-3 flex items-center gap-3 ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          <span className="h-[2px] w-8 bg-racing-yellow" />
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-racing-yellow">
            {label}
          </span>
        </div>
      )}
      <h2 className="heading-font text-3xl font-bold uppercase tracking-tight text-white md:text-5xl">
        {title}
      </h2>
    </Reveal>
  );
}
