export type Screen =
  | "home"
  | "newCharacter"
  | "loadCharacter"
  | "characterSheet";

export type Race =
  | "Human"
  | "Elf"
  | "Dwarf"
  | "Orc"
  | "Goblin"
  | "Tiefling"
  | "Centaur"
  | "Dragonborn"
  | "Vampire";

export type Character = {
  id: string;
  name: string;
  race: Race;
  level: number;
  xp: number;
  currentHp: number;
  maxHp: number;
};