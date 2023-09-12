import * as constants from "./data";
import "./GameOver.css";

const GameOver = ({
  complete,
  stats,
  setStats,
  setPhase,
  setOptions,
  options,
}) => {
  return (
    <div className="gameOverContainer">
      <h2 className="gameOverTitle">
        {complete ? "Congratulations!" : "Game Over"}
      </h2>
      <h3>
        {complete
          ? `You named every Pokemon in the selected generations (${stats.correct} total)! Your score is ${stats.score}`
          : `You got ${stats.correct} correct for a score of ${stats.score}`}
      </h3>
      <button
        className="tryAgainButton"
        onClick={() => {
          setPhase(constants.Phase.guess);
          const newOptions = options;
          delete newOptions.over;
          setOptions(newOptions);
          setStats({ correct: 0, score: 0 });
        }}
      >
        Try again
      </button>

      <button
        className="backButton"
        onClick={() => {
          setPhase(constants.Phase.main);
          setOptions(null);
          setStats({ correct: 0, score: 0 });
        }}
      >
        Back to Main
      </button>
    </div>
  );
};

export default GameOver;
