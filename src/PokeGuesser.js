import { useState } from "react";
import { useEffect } from "react";
import * as constants from "./data";
import "./PokeGuesser.css";
import axios from "axios";
import GameOver from "./GameOver";
import AnswerDialog from "./AnswerDialog";
import GuessingDialog from "./GuessingDialog";
import PokeImage from "./PokeImage";
import Switch from "./Switch";

const randomizer = (indices) => {
  return indices[Math.floor(Math.random() * indices.length)];
};

const genIndices = (gens) => {
  const genEnds = constants.genEnds;

  const i1 = gens.map((g) =>
    Array.from(Array(genEnds[g] - genEnds[g - 1]), (x, i) => i + genEnds[g - 1])
  );

  return [].concat(...i1);
};

const PokeGuesser = ({
  options,
  stats,
  setStats,
  setOptions,
  phase,
  setPhase,
  gens,
}) => {
  const [indices, setIndices] = useState(genIndices(gens));
  const [poke, setPoke] = useState("");
  const [randI, setRandI] = useState(randomizer(indices));

  const Phase = constants.Phase;

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${randI + 1}/`)
      .then((response) => response.json())
      .then((poke) =>
        setPoke({ name: formatName(poke.name), types: poke.types })
      );
  }, [randI]);

  const capFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const formatName = (name) => {
    const suffixes = constants.suffixes;
    const specialNames = constants.specialNames;
    const snI = specialNames.dbNames.indexOf(name);

    if (snI !== -1) {
      return specialNames.realNames[snI];
    } else if (name.includes("-")) {
      const brokenName = name.split("-");
      if (suffixes.includes(brokenName[1])) {
        name = brokenName[0];
      } else {
        name = brokenName[0] + " " + capFirstLetter(brokenName[1]);
      }
    }
    return capFirstLetter(name);
  };

  const nextPokemon = (paramIndices) => {
    const newIndices = paramIndices.filter((val) => val !== randI);
    setIndices(newIndices);
    setRandI(randomizer(newIndices));
  };

  return (
    // ADD IF THEY GET THEM ALL
    <div className="gameInterfaceContainer">
      {options.gameType === "freePlay" ? (
        <div className="switchContainer">
          <Switch
            text="Timer          "
            update={(t) => setOptions({ ...options, timer: t })}
          />

          <Switch
            text="Silhouettes   "
            update={(c) => setOptions({ ...options, color: c })}
          />
        </div>
      ) : (
        <h2
          className="stats"
          style={{
            margin: "0px",
            fontSize: "4.5vh",
            color: stats.over ? "red" : "black",
          }}
        >
          {stats.over ? "Time's Up!" : `Score: ${stats.score}`}
        </h2>
      )}

      <PokeImage
        key={randI}
        pokeNumber={randI + 1}
        showAnswer={phase === Phase.answer || options.color}
        poke={poke}
      />
      {phase === Phase.guess ? (
        <GuessingDialog
          options={options}
          setOptions={setOptions}
          poke={poke}
          nextPokemon={() => nextPokemon(indices)}
          stats={stats}
          setStats={setStats}
          setPhase={setPhase}
          indices={indices}
        />
      ) : (
        <AnswerDialog
          poke={poke}
          options={options}
          stats={stats}
          setPhase={setPhase}
          nextPokemon={() => nextPokemon(indices)}
        />
      )}
    </div>
  );
};

export default PokeGuesser;
