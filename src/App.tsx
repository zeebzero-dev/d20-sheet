import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>D20 Sheet</h1>
        <p>RPG Character Manager</p>
      </header>

      <main className="menu">
        <button>New Character</button>
        <button>Load Character</button>
        <button>Settings</button>
        <button>About</button>
      </main>

      <footer className="footer">
        <small>Version 0.1</small>
      </footer>
    </div>
  );
}

export default App;