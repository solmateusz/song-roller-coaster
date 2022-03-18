import React, { useEffect, useState } from 'react';
import './App.css';
import { ListRoller } from './Components/ListRoller';
import logo from './rollercoaster.gif';

function App() {
  const [band, setBand] = useState<string>("");
  const [list, setList] = useState<string[]>(["A", "B", "C", "D", "E"]);
  const [cancellationToken, setCancellationToken] = useState<NodeJS.Timeout>();

  useEffect(() => {
    if (cancellationToken)
      clearTimeout(cancellationToken);

    if (band.length < 3){
      return;
    }

    async function fetchData(){
      const response = await fetch(`https://itunes.apple.com/search?term=${band}`)
      const result = await response.json();
      const data: {collectionName: string}[] = result.results;
      const albumTitles = data.map(i => i.collectionName).filter((value, index, array) => array.indexOf(value) === index);
      albumTitles.sort();
      setList(albumTitles.slice(0, 5));
    }
    
    const newCancellationToken = setTimeout(() => {
      fetchData();
    }, 500);

    setCancellationToken(newCancellationToken);

  }, [band])

  return (
    <div className="App">
      <header className="App-header">
        <div className="title">
          <div>Albums</div> 
          <div>Roller</div>
          <div>Coaster</div>
        </div>
        <img src={logo} className="App-logo" alt="logo" />
        <input type="text" value={band} onChange={(e) => setBand(e.target.value)} placeholder="Search Band"/>
        <ListRoller items={list} />
      </header>
    </div>
  );
}

export default App;
