import type { Character } from "../types/character";

const STORAGE_KEY = "d20-characters";

export function loadCharacters(): Character[] {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return [];
  }

  return JSON.parse(saved);
}

export function saveCharacters(characters: Character[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(characters));
}