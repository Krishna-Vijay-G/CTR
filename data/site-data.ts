import rawSiteData from "./site-data.json";
import type { SiteData } from "@/types/site";

const siteData = rawSiteData as unknown as SiteData;

export default siteData;

// Convenience named exports for tree-shakeable imports.
export const {
  site,
  hero,
  about,
  teamPrincipal,
  socialMedia,
  contact,
  carSpecs,
  drivers,
  achievements,
  gallery,
  races,
  sponsors,
  news,
} = siteData;
