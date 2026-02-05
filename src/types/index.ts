export interface SiteConfig {
  name: string;
  abbreviation: string;
  tagline: string;
  description: string;
  founded: number;
  headquarters: string;
  currentSeason: number;
  championship: string;
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
}

export interface Car {
  name: string;
  year: number;
  image: string;
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
}

export interface SponsorsData {
  title: Sponsor[];
  principal: Sponsor[];
  official: Sponsor[];
  technical: Sponsor[];
}

export interface NewsArticle {
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
  teamPrincipal: TeamPrincipal;
  socialMedia: SocialMedia;
  contact: Contact;
  car: Car;
  drivers: Driver[];
  races: RacesData;
  sponsors: SponsorsData;
  news: NewsArticle[];
}
