import "./GuessingDialog.css";

const GuessingDialog = ({ names, randI, incrementStats, setShowAnswer }) => {
  // const [guess, setGuess] = useState("");

  const checkGuess = (guess) => {
    if (guess.trim().toLowerCase() === names[randI].toLowerCase()) {
      incrementStats(true);
      setShowAnswer(true);
    }
  };

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
