import { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import CharacterSheet from "./pages/CharacterSheet";
import type { Character, Race, Screen } from "./types/character";
import { loadCharacters, saveCharacters } from "./storage/characterStorage";

const races: Race[] = [
  "Human",
  "Elf",
  "Dwarf",
  "Orc",
  "Goblin",
  "Tiefling",
  "Centaur",
  "Dragonborn",
  "Vampire",
];

function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [name, setName] = useState("");
  const [race, setRace] = useState<Race>("Human");

  useEffect(() => {
    setCharacters(loadCharacters());
  }, []);

  function updateCharacters(nextCharacters: Character[]) {
    setCharacters(nextCharacters);
    saveCharacters(nextCharacters);
  }

  function createCharacter() {
    if (!name.trim()) {
      alert("Enter a character name.");
      return;
    }

    const newCharacter: Character = {
      id: crypto.randomUUID(),
      name: name.trim(),
      race,
      level: 1,
      xp: 0,
      currentHp: 50,
      maxHp: 50,
    };

    updateCharacters([...characters, newCharacter]);
    setSelectedCharacter(newCharacter);
    setName("");
    setRace("Human");
    setScreen("characterSheet");
  }

  function deleteCharacter(id: string) {
    const nextCharacters = characters.filter((character) => character.id !== id);
    updateCharacters(nextCharacters);

    if (selectedCharacter?.id === id) {
      setSelectedCharacter(null);
    }
  }

  if (screen === "home") {
    return <Home setScreen={setScreen} />;
  }

  if (screen === "newCharacter") {
    return (
      <div className="app">
        <section className="panel">
          <h1>New Character</h1>

          <label>Character Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />

          <label>Race</label>
          <select value={race} onChange={(e) => setRace(e.target.value as Race)}>
            {races.map((raceOption) => (
              <option key={raceOption} value={raceOption}>
                {raceOption}
              </option>
            ))}
          </select>

          <div className="stats-preview">
            <p>Level: 1</p>
            <p>XP: 0</p>
            <p>HP: 50 / 50</p>
          </div>

          <button onClick={createCharacter}>Create Character</button>
          <button className="secondary" onClick={() => setScreen("home")}>
            Cancel
          </button>
        </section>
      </div>
    );
  }

  if (screen === "loadCharacter") {
    return (
      <div className="app">
        <section className="panel">
          <h1>Load Character</h1>

          {characters.length === 0 ? (
            <p>No characters saved yet.</p>
          ) : (
            <div className="character-list">
              {characters.map((character) => (
                <div className="character-card" key={character.id}>
                  <div>
                    <h2>{character.name}</h2>
                    <p>
                      {character.race} • Level {character.level}
                    </p>
                    <p>
                      HP: {character.currentHp} / {character.maxHp}
                    </p>
                  </div>

                  <div className="card-actions">
                    <button
                      onClick={() => {
                        setSelectedCharacter(character);
                        setScreen("characterSheet");
                      }}
                    >
                      Open
                    </button>

                    <button
                      className="danger"
                      onClick={() => deleteCharacter(character.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button className="secondary" onClick={() => setScreen("home")}>
            Back
          </button>
        </section>
      </div>
    );
  }

  if (screen === "characterSheet" && selectedCharacter) {
    return (
      <CharacterSheet
        character={selectedCharacter}
        goBack={() => setScreen("loadCharacter")}
      />
    );
  }

  return <Home setScreen={setScreen} />;
}

export default App;