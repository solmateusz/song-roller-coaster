import React, { useEffect, useState } from "react";
import "./App.css";
import { ListRoller } from "./Components/ListRoller";
import { useAlbumsSearch } from "./Hooks/useAlbumsSearch";
import logo from "./Resources/rollercoaster.gif";

function App() {
  const [band, setBand] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const albums = useAlbumsSearch(band, 5);

  useKeypressDelay(searchTerm, setBand, 700);

  return (
    <div className="App">
      <header className="App-header">
        <div className="title">
          <div>Albums</div>
          <div>Roller</div>
          <div>Coaster</div>
        </div>
        <img src={logo} className="App-logo" alt="logo" />
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search Band" />
        <ListRoller items={albums} />
      </header>
    </div>
  );
}

export default App;

function useKeypressDelay(value: string, setFn: (s: string) => void, delayMs: number){
  const [cancellationToken, setCancellationToken] = useState<NodeJS.Timeout>();

  useEffect(() => {
    if (cancellationToken) clearTimeout(cancellationToken);

    const newCancellationToken = setTimeout(() => {
      setFn(value);
    }, delayMs);

    setCancellationToken(newCancellationToken);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
}


