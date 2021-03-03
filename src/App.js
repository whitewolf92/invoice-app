import "./App.css";
import Main from "./pages/Main";

const App = () => {
  return (
    <div className="App">
      <header className="App-header block w-full py-6 mb-10 border-b-2">
        <div className="flex flex-wrap justify-center text-3xl">
          Xendit PDF Exporter
        </div>
      </header>
      <main className="container mx-auto">
        <Main />
      </main>
    </div>
  );
};

export default App;
