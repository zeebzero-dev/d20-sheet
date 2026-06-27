import type { Character } from "../types/character";

type CharacterSheetProps = {
  character: Character;
  goBack: () => void;
};

function CharacterSheet({ character, goBack }: CharacterSheetProps) {
  return (
    <div className="sheet-layout">
      <aside className="sidebar">
        <h2>☠ D20 Sheet</h2>
        <p>Made for Every Level</p>

        <nav>
          <button className="active">👤 Character</button>
          <button>📊 Attributes</button>
          <button>⚔ Equipment</button>
          <button>🎒 Inventory</button>
          <button>🐺 Pets</button>
          <button>🐎 Mounts</button>
          <button>🛡 Combat</button>
        </nav>

        <button className="secondary" onClick={goBack}>
          Back
        </button>
      </aside>

      <main className="sheet-main">
        <section className="character-hero">
          <div className="portrait-placeholder">☠</div>

          <div>
            <h1>{character.name}</h1>
            <p>{character.race}</p>
            <p>Level {character.level}</p>
          </div>
        </section>

        <section className="stat-grid">
          <div className="stat-card">
            <h3>XP</h3>
            <p>{character.xp} / 100</p>
          </div>

          <div className="stat-card">
            <h3>HP</h3>
            <p>
              {character.currentHp} / {character.maxHp}
            </p>
          </div>

          <div className="stat-card">
            <h3>Race</h3>
            <p>{character.race}</p>
          </div>

          <div className="stat-card">
            <h3>Level</h3>
            <p>{character.level}</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default CharacterSheet;