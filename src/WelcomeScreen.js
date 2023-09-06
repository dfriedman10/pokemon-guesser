import GenChooser from "./GenChooser";
import "./WelcomeScreen.css";

const WelcomeScreen = ({
  indices,
  setIndices,
  setShowColor,
  setTimer,
  startGame,
}) => {
  return (
    <div className="mainContainer">
      <GenChooser indices={indices} setIndices={setIndices} />
      <div className="switchContainer">
        <Switch text="Color " update={setShowColor} />
        <Switch text="Timer " update={setTimer} />
      </div>
      <switch />
      <input
        type="image"
        alt="Play"
        className="playButton"
        onClick={startGame}
        disabled={indices.length === 0}
      />
    </div>
  );
};

const Switch = ({ text, update }) => {
  return (
    <form>
      {text}
      <label className="switch">
        <input type="checkbox" onChange={(e) => update(e.target.checked)} />
        <span className="slider" />
      </label>
    </form>
  );
};

export default WelcomeScreen;
