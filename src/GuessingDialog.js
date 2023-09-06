import "./GuessingDialog.css";
import { useState } from "react";
import { useEffect } from "react";

const GuessingDialog = ({
  timerOn,
  names,
  randI,
  incrementStats,
  setShowAnswer,
  nextPokemon,
}) => {
  // const [guess, setGuess] = useState("");

  const checkGuess = (guess) => {
    if (guess.trim().toLowerCase() === names[randI].toLowerCase()) {
      incrementStats(true);
      setShowAnswer(true);
    }
  };
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft <= 1) {
        setShowAnswer(true);
        incrementStats(false);
      } else {
        setTimeLeft((t) => t - 1);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  // function handleClick() {
  //   if (guess.toLowerCase() === names[randI].toLowerCase()) {
  //     incrementStats(true);
  //     setShowAnswer(true);
  //   }
  //   setGuess("");
  // }

  // function handleKey(e) {
  //   if (e.key === "Enter") handleClick();
  // }

  return (
    <>
      <div>
        {timerOn && <b className="timer">{timeLeft}</b>}
        <input
          className="guessBox"
          autoFocus
          type="text"
          // value={guess}
          // onKeyUp={handleKey}
          onChange={(e) => checkGuess(e.target.value)}
        />
        {/* <button onClick={handleClick}>Next </button> */}

        <input
          value="Give Up?"
          type="button"
          className="giveUp"
          onClick={() => {
            // setGuess("");
            incrementStats(false);
            setShowAnswer(true);
          }}
        ></input>
      </div>
    </>
  );
};

export default GuessingDialog;
