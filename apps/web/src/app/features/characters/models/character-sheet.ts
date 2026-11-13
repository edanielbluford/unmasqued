export interface RatedItem {
  name: string;
  rating: number;
}

export interface TraitGroups {
  physical: RatedItem[];
  social: RatedItem[];
  mental: RatedItem[];
}

export interface CharacterTrack {
  current: number;
  maximum: number;
}

export interface Discipline {
  name: string;
  powers: {
    name: string;
    level: string;
  }[];
}

export interface ExperienceEntry {
  date: string;
  change: string;
  reason: string;
}

export interface CharacterSheet {
  id: string;
  name: string;
  playerName: string;
  characterType: string;
  concept: string;
  status: string;
  characterId: string;
  narrator: string;
  dates: {
    starting: string;
    lastModified: string;
    printed: string;
  };
  experience: {
    unspent: number;
    earned: number;
    history: ExperienceEntry[];
  };
  identity: {
    clan: string;
    generation: string;
    sect: string;
    title: string;
    nature: string;
    demeanor: string;
    coterie: string;
    sire: string;
  };
  tracks: {
    blood: CharacterTrack;
    willpower: CharacterTrack;
    morality: {
      path: string;
      aura: string;
      traits: CharacterTrack;
      selfControl: number;
      conscience: number;
      courage: number;
    };
  };
  traits: {
    positive: TraitGroups;
    negative: TraitGroups;
  };
  abilities: RatedItem[];
  disciplines: Discipline[];
  specialTraits: string[];
  statusTraits: RatedItem[];
  rituals: string[];
  backgrounds: RatedItem[];
  influences: RatedItem[];
  miscellaneousTraits: string[];
  derangements: string[];
  bloodBonds: string[];
  boons: string[];
  merits: RatedItem[];
  flaws: RatedItem[];
  equipment: string[];
  healthLevels: RatedItem[];
  notes: string;
}
