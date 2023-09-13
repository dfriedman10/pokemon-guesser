import { useEffect, useState } from "react";
import PokeGuesser from "./PokeGuesser";
import WelcomeScreen from "./WelcomeScreen";
import * as constants from "./data";
import title from "./Poke Title.png";
import "./GameMain.css";
import GameOver from "./GameOver";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBjVeVrmWYU1MNPJAAgcHM8jB3up5_nk3w",
  authDomain: "pokeguesser-665bb.firebaseapp.com",
  projectId: "pokeguesser-665bb",
  storageBucket: "pokeguesser-665bb.appspot.com",
  messagingSenderId: "4165695644",
  appId: "1:4165695644:web:fd53578fc28f0a2256d559",
  measurementId: "G-2K3N0HN11R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

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
            db={db}
            gens={gens}
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
