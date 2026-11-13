import { Injectable } from '@angular/core';
import { CharacterSheet } from '../models/character-sheet';

export const DEMO_CHARACTERS: readonly CharacterSheet[] = [
  {
    id: 'evelyn-thorne',
    name: 'Evelyn Thorne',
    playerName: 'Mara Vale',
    characterType: 'Vampire',
    concept: 'Night-shift paramedic',
    status: 'Active',
    characterId: 'SH-1042',
    narrator: 'Iris Wren',
    dates: {
      starting: 'July 12, 2026',
      lastModified: 'November 10, 2026',
      printed: 'November 13, 2026',
    },
    experience: {
      unspent: 3,
      earned: 18,
      history: [
        { date: 'August 9, 2026', change: '+5', reason: 'Story attendance' },
        { date: 'September 13, 2026', change: '-2', reason: 'Medicine training' },
        { date: 'October 11, 2026', change: '+5', reason: 'Story attendance' },
      ],
    },
    identity: {
      clan: 'Greybrook',
      generation: '11th',
      sect: 'Harbor Council',
      title: 'Night Warden',
      nature: 'Caretaker',
      demeanor: 'Pragmatist',
      coterie: 'Tidewatch',
      sire: 'Aurelia Voss',
    },
    tracks: {
      blood: { current: 8, maximum: 15 },
      willpower: { current: 6, maximum: 10 },
      morality: {
        path: 'Humanity',
        aura: '+0',
        traits: { current: 6, maximum: 10 },
        selfControl: 4,
        conscience: 3,
        courage: 4,
      },
    },
    traits: {
      positive: {
        physical: [
          { name: 'Fleet-footed', rating: 2 },
          { name: 'Hardy', rating: 3 },
          { name: 'Quick', rating: 2 },
        ],
        social: [
          { name: 'Assuring', rating: 2 },
          { name: 'Persuasive', rating: 3 },
          { name: 'Warm', rating: 2 },
        ],
        mental: [
          { name: 'Attentive', rating: 2 },
          { name: 'Level-headed', rating: 3 },
          { name: 'Observant', rating: 2 },
        ],
      },
      negative: {
        physical: [],
        social: [{ name: 'Reserved', rating: 1 }],
        mental: [],
      },
    },
    abilities: [
      { name: 'Alertness', rating: 3 },
      { name: 'Empathy', rating: 2 },
      { name: 'Medicine', rating: 3 },
      { name: 'Persuasion', rating: 2 },
      { name: 'Stealth', rating: 2 },
      { name: 'Streetwise', rating: 1 },
    ],
    disciplines: [
      {
        name: 'Beastcraft',
        powers: [
          { name: 'Scent of the Wild', level: 'Basic' },
          { name: 'Call of the Pack', level: 'Intermediate' },
        ],
      },
      {
        name: 'Veil',
        powers: [{ name: 'Fade from Sight', level: 'Basic' }],
      },
    ],
    specialTraits: ['Night vision', 'Silent step'],
    statusTraits: [
      { name: 'Trusted', rating: 1 },
      { name: 'Recognized', rating: 1 },
    ],
    rituals: [],
    backgrounds: [
      { name: 'Allies', rating: 2 },
      { name: 'Safe haven', rating: 1 },
      { name: 'Resources', rating: 2 },
    ],
    influences: [
      { name: 'Medical', rating: 2 },
      { name: 'Street', rating: 1 },
    ],
    miscellaneousTraits: ['Knows the night-shift staff at St. Agnes'],
    derangements: [],
    bloodBonds: [],
    boons: ['Owes a minor favor to the Harbormaster'],
    merits: [
      { name: 'Calm under pressure', rating: 2 },
      { name: 'Keen senses', rating: 1 },
    ],
    flaws: [{ name: 'Daylight sensitive', rating: 2 }],
    equipment: ['Medical kit', 'Well-worn leather jacket'],
    healthLevels: [
      { name: 'Healthy', rating: 2 },
      { name: 'Bruised', rating: 1 },
      { name: 'Wounded', rating: 0 },
      { name: 'Incapacitated', rating: 0 },
    ],
    notes: 'Keeps a second medical kit in the ambulance bay locker.',
  },
];

@Injectable({ providedIn: 'root' })
export class DemoCharacters {
  getMyCharacters(): readonly CharacterSheet[] {
    return DEMO_CHARACTERS;
  }

  getCharacter(id: string): CharacterSheet | undefined {
    return DEMO_CHARACTERS.find((character) => character.id === id);
  }
}
