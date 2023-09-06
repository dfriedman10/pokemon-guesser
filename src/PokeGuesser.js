import { useState } from "react";
import { useEffect } from "react";
import * as constants from "./data";
import "./PokeGuesser.css";
import axios from "axios";
import EmptyDialog from "./EmptyDialog";
import AnswerDialog from "./AnswerDialog";
import GuessingDialog from "./GuessingDialog";
import PokeImage from "./PokeImage";

function randomizer(indices) {
  return indices[Math.floor(Math.random() * indices.length)];
}

const PokeGuesser = ({ showColor, timer, indices, setIndices }) => {
  const [stats, setStats] = useState({ correct: 0, total: 0 });
  const [randI, setRandI] = useState(randomizer(indices));
  const [showAnswer, setShowAnswer] = useState(false);
  const [names, setNames] = useState([]);

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

  useEffect(() => {
    const fetchNames = async () => {
      const url = `https://pokeapi.co/api/v2/pokemon/?limit=${
        constants.genEnds[constants.genEnds.length - 1]
      }}`;
      const response = await axios.get(url);
      const data = response.data;
      setNames(data.results.map((poke) => formatName(poke.name)));
    };
    fetchNames();
  }, []);

  const nextPokemon = (paramIndices) => {
    const newIndices = paramIndices.filter((val) => val !== randI);
    setIndices(newIndices);
    setRandI(randomizer(newIndices));
  };

  return (
    <div className="guessContainer">
      <h2 className="stats">
        {"Correct: " + stats.correct + "/" + stats.total}
      </h2>

      {indices.length > 0 ? (
        <>
          <PokeImage
            key={randI}
            pokeNumber={randI + 1}
            showAnswer={showAnswer || showColor}
            names={names}
          />
          {!showAnswer ? (
            <GuessingDialog
              names={names}
              randI={randI}
              incrementStats={(increase) => {
                setStats({
                  total: stats.total + 1,
                  correct: increase ? stats.correct + 1 : stats.correct,
                });
              }}
              setShowAnswer={setShowAnswer}
            />
          ) : (
            <AnswerDialog
              names={names}
              randI={randI}
              setShowAnswer={setShowAnswer}
              nextPokemon={() => nextPokemon(indices)}
            />
          )}
        </>
      ) : (
        <EmptyDialog />
      )}
    </div>
  );
};

export default PokeGuesser;
