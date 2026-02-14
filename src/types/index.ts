/* ── Types ── */

export interface SiteConfig {
  name: string;
  abbreviation: string;
  tagline: string;
  description: string;
  founded: number;
  headquarters: string;
  currentSeason: number;
  championship: string;
  officialWebsite: string;
}

export interface HeroData {
  title: string;
  subtitle: string;
  description: string;
  videoSrc: string;
  stats: { value: string; label: string }[];
}

export interface AboutData {
  title: string;
  subtitle: string;
  description: string;
  description2: string;
  image: string;
  stats: { value: string; label: string }[];
}

export interface TeamPrincipal {
  name: string;
  title: string;
  image: string;
}

export interface SocialMedia {
  instagram: string;
  facebook: string;
  twitter: string;
  youtube: string;
}

export interface Contact {
  email: string;
  phone: string;
  address: string;
  mapEmbed?: string;
}

export interface CarSpec {
  label: string;
  value: string;
}

export interface CarSpecs {
  name: string;
  tagline: string;
  year: number;
  image: string;
  image2: string;
  image3: string;
  description: string;
  specs: CarSpec[];
}

export interface DriverStats {
  raceWins: number;
  polePositions: number;
  grandPrix: number;
  podiums: number;
  fastestLaps: number;
  points: number;
}

export interface Driver {
  id: string;
  firstName: string;
  lastName: string;
  nationality: string;
  countryCode: string;
  flagEmoji: string;
  championship?: string;
  car?: string;
  number: number;
  dateOfBirth: string;
  height: string;
  weight: string;
  image: string;
  heroImage: string;
  quote: string;
  biography: string;
  stats: DriverStats;
  careerHighlights: string[];
}

export interface Achievement {
  year: string;
  title: string;
  description: string;
}

export interface GalleryItem {
  src: string;
  alt: string;
  category: string;
}

export interface Race {
  round: number;
  name: string;
  location: string;
  country: string;
  flagEmoji: string;
  dateStart: string;
  dateEnd: string;
  circuitLength: string;
  laps: number;
  isNightRace: boolean;
  isStreetCircuit: boolean;
  description?: string;
}

export interface StreetCircuit {
  name: string;
  length: string;
  capacity: number;
  stands: number;
  image?: string;
  route: string[];
  features: string[];
}

export interface RacesData {
  season: number;
  seasonName: string;
  calendar: Race[];
  streetCircuit: StreetCircuit;
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  fullLogo?: string;
  website: string;
  description?: string;
}

export interface SponsorsData {
  title: Sponsor[];
  principal: Sponsor[];
  official: Sponsor[];
  technical: Sponsor[];
}

export interface NewsArticle {
  image1: string | undefined;
  id: string;
  title: string;
  slug: string;
  publishDate: string;
  category: string;
  image: string;
  excerpt: string;
  author: string;
  content: string;
  tags: string[];
}

export interface SiteData {
  site: SiteConfig;
  hero: HeroData;
  about: AboutData;
  teamPrincipal: TeamPrincipal;
  socialMedia: SocialMedia;
  contact: Contact;
  carSpecs: CarSpecs;
  drivers: Driver[];
  achievements: Achievement[];
  gallery: GalleryItem[];
  races: RacesData;
  sponsors: SponsorsData;
  news: NewsArticle[];
}
