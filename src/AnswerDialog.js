import { useEffect, useState } from "react";
import * as constants from "./data";

const AnswerDialog = ({ poke, setPhase, options, nextPokemon, stats }) => {
  const [time, setTime] = useState(5);

  const next = () => {
    if (stats.over) {
      setPhase(constants.Phase.over);
    } else {
      setPhase(constants.Phase.guess);
      nextPokemon();
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (time <= 1) {
        next();
      } else {
        setTime((t) => t - 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [time]);

  useEffect(() => {
    const handleSpace = (e) => {
      if (e.key === " ") {
        next();
      }
    };
    document.addEventListener("keydown", handleSpace);

    return () => document.removeEventListener("keydown", handleSpace);
  }, []);

  return (
    <>
      <div>
        <b style={{ fontSize: "4vh" }}>
          {options.gameType === "freePlay"
            ? options.gaveUp
              ? poke.name
              : "Correct!"
            : poke.name}
        </b>
        <p style={{ fontSize: "2vh" }}>{time} (press space to skip)</p>
      </div>
    </>
  );
};

export default AnswerDialog;
