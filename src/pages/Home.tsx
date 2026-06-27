import type { Screen } from "../types/character";

type HomeProps = {
  setScreen: (screen: Screen) => void;
};

function Home({ setScreen }: HomeProps) {
  return (
    <div className="app">
      <header className="header">
        <h1>☠ D20 Sheet</h1>
        <p>Made for Every Level</p>
      </header>

      <main className="menu">
        <button onClick={() => setScreen("newCharacter")}>
          New Character
        </button>

        <button onClick={() => setScreen("loadCharacter")}>
          Load Character
        </button>

        <button>Settings</button>

        <button>About</button>
      </main>

      <footer className="footer">
        <small>Version 0.3 - Character</small>
      </footer>
    </div>
  );
}

export default Home;