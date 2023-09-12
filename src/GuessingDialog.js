import "./GuessingDialog.css";
import { useState } from "react";
import { useEffect } from "react";
import * as constants from "./data";

const GuessingDialog = ({
  options,
  setOptions,
  stats,
  setStats,
  poke,
  setPhase,
  indices,
}) => {
  const checkGuess = (guess) => {
    if (guess.trim().toLowerCase() === poke.name.toLowerCase()) {
      if (options.gameType === "competitive")
        setStats({
          correct: stats.correct + 1,
          score:
            Math.round(
              (stats.score +
                options.scoreMult * (5 - (Date.now() - startTime) / 1000)) *
                100
            ) / 100,
        });
      //UPDATE SCORING
      else setOptions({ ...options, gaveUp: false });

      if (indices.length === 1) setPhase(constants.Phase.complete);
      else setPhase(constants.Phase.answer);
    }
  };
  const [timeLeft, setTimeLeft] = useState(5);
  const [showHint, setShowHint] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    if (options.timer) {
      const timer = setTimeout(() => {
        if (timeLeft <= 1) {
          if (options.gameType === "freePlay") {
            setPhase(constants.Phase.answer);
            setOptions({ ...options, gaveUp: true });
          } else {
            setStats({ ...stats, over: true });
            setPhase(constants.Phase.answer);
          }
        } else {
          setTimeLeft((t) => t - 1);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, options]);

  return (
    <>
      <div className="guessContainer">
        {options.timer && <b className="timer">{timeLeft}</b>}
        <input
          className="guessBox"
          autoFocus
          type="text"
          onChange={(e) => checkGuess(e.target.value)}
        />

        {options.gameType === "freePlay" && (
          <>
            {showHint ? (
              <>
                {poke.types.map((t) => (
                  <img
                    alt={t.type.name}
                    className="hintImage"
                    src={require(`./TypeIcons/${t.type.name}.png`)}
                  />
                ))}
              </>
            ) : (
              <input
                className="hintButton"
                value="Hint"
                type="button"
                onClick={() => setShowHint(true)}
              />
            )}

            <input
              value="Give Up?"
              type="button"
              className="giveUpButton"
              onClick={() => {
                setOptions({ ...options, gaveUp: true });
                setPhase(constants.Phase.answer);
              }}
            />
          </>
        )}
      </div>
    </>
  );
};

export default GuessingDialog;
