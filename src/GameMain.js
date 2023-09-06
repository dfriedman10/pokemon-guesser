import { useState } from "react";
import PokeGuesser from "./PokeGuesser";
import WelcomeScreen from "./WelcomeScreen";
import * as constants from "./data";
import title from "./Poke Title.png";

const GameMain = () => {
  const genEnds = constants.genEnds;
  const [gameStarted, setGameStarted] = useState(false);
  const [showColor, setShowColor] = useState(false);
  const [timer, setTimer] = useState(false);
  const [indices, setIndices] = useState(
    Array.from(Array(genEnds[genEnds.length - 1]).keys())
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img className="title" src={title} />

      {gameStarted ? (
        <PokeGuesser
          showColor={showColor}
          timer={timer}
          indices={indices}
          setIndices={setIndices}
        />
      ) : (
        <WelcomeScreen
          startGame={() => setGameStarted(true)}
          indices={indices}
          setIndices={setIndices}
          setTimer={setTimer}
          setShowColor={setShowColor}
        />
      )}
    </div>
  );
};

export default GameMain;
