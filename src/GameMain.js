import { useState } from "react";
import PokeGuesser from "./PokeGuesser";
import WelcomeScreen from "./WelcomeScreen";
import * as constants from "./data";
import title from "./Poke Title.png";
import "./GameMain.css";
import GameOver from "./GameOver";

const GameMain = () => {
  const Phase = constants.Phase;
  const [options, setOptions] = useState(null);
  const [phase, setPhase] = useState(Phase.main);
  const [gens, setGens] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [stats, setStats] = useState({ correct: 0, score: 0 });

  const gameMode = () => {
    switch (phase) {
      case Phase.main:
        return (
          <WelcomeScreen
            startGame={() => setPhase(Phase.guess)}
            setGens={setGens}
            gens={gens}
            options={options}
            setOptions={setOptions}
          />
        );

      case Phase.complete:
      case Phase.over:
        return (
          <GameOver
            complete={phase === Phase.complete}
            stats={stats}
            setPhase={setPhase}
            options={options}
            setStats={setStats}
            setOptions={setOptions}
          />
        );

      default:
        return (
          <PokeGuesser
            options={options}
            setOptions={setOptions}
            phase={phase}
            setPhase={setPhase}
            gens={gens}
            stats={stats}
            setStats={setStats}
          />
        );
    }
  };

  return (
    <div>
      <div className="homeContainer">
        <img
          className="homeIcon"
          onClick={() => {
            setPhase(Phase.main);
            setOptions(null);
            setStats({ correct: 0, score: 0 });
          }}
          alt="home"
          src={require("./home.png")}
        />
      </div>
      <div className="mainContainer">
        <img className="title" src={title} alt="Title" />

        {gameMode(phase)}
      </div>
    </div>
  );
};

export default GameMain;
