import { useEffect, useState } from "react";
import "./App.css";

type Screen = "home" | "newCharacter" | "loadCharacter";

type Race =
  | "Human"
  | "Elf"
  | "Dwarf"
  | "Orc"
  | "Goblin"
  | "Tiefling"
  | "Centaur"
  | "Dragonborn"
  | "Vampire";

type Character = {
  id: string;
  name: string;
  race: Race;
  level: number;
  xp: number;
  currentHp: number;
  maxHp: number;
};

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
  const [name, setName] = useState("");
  const [race, setRace] = useState<Race>("Human");

  useEffect(() => {
    const saved = localStorage.getItem("d20-characters");
    if (saved) {
      setCharacters(JSON.parse(saved));
    }
  }, []);

  function saveCharacters(nextCharacters: Character[]) {
    setCharacters(nextCharacters);
    localStorage.setItem("d20-characters", JSON.stringify(nextCharacters));
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

    saveCharacters([...characters, newCharacter]);
    setName("");
    setRace("Human");
    setScreen("loadCharacter");
  }

  function deleteCharacter(id: string) {
    saveCharacters(characters.filter((character) => character.id !== id));
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

                  <button
                    className="danger"
                    onClick={() => deleteCharacter(character.id)}
                  >
                    Delete
                  </button>
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

  return (
    <div className="app">
      <header className="header">
        <h1>D20 Sheet</h1>
        <p>RPG Character Manager</p>
      </header>

      <main className="menu">
        <button onClick={() => setScreen("newCharacter")}>New Character</button>
        <button onClick={() => setScreen("loadCharacter")}>Load Character</button>
        <button>Settings</button>
        <button>About</button>
      </main>

      <footer className="footer">
        <small>Version 0.2</small>
      </footer>
    </div>
  );
}

export default App;