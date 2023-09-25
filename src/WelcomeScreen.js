import GenChooser from "./GenChooser";
import "./WelcomeScreen.css";
import { BrowserView, MobileView } from "react-device-detect";
import playImage from "./Play button.png";

const WelcomeScreen = ({ setGens, gens, startGame, options, setOptions }) => {
  return (
    <div className="welcomeContainer">
      <GenChooser setGens={setGens} gens={gens} />
      <div className="choicesContainer">
        <div
          className="competitiveOption"
          style={
            options && options.gameType === "competitive"
              ? { backgroundColor: "rgb(240, 181, 181)" }
              : {}
          }
          onClick={() =>
            setOptions({
              gameType: "competitive",
              timer: true,
              color: false,
              scoreMult: 0.9 + 0.1 * gens.length,
            })
          }
        >
          <h2 style={{ fontSize: "3.5vmin" }}>Competitive Mode</h2>
          <p style={{ fontSize: "2.5vmin" }}>
            Survival mode. Score more points for quick answers and for more
            selected generations
          </p>
        </div>
        <div
          onClick={() =>
            setOptions({
              gameType: "freePlay",
              timer: false,
              color: false,
              scoreMult: 0.9 + 0.1 * gens.length,
            })
          }
          className="freePlayOption"
          style={
            options && options.gameType === "freePlay"
              ? { backgroundColor: "rgb(200, 248, 232)" }
              : {}
          }
        >
          <h2 style={{ fontSize: "3.5vmin" }}>Free Play Mode</h2>
          <p style={{ fontSize: "2.5vmin" }}>
            Turn timer on or off, guess pokemon by silhouette or by image, and
            get hints if you're stuck
          </p>
        </div>
      </div>
      <BrowserView>
        <input
          type="image"
          alt="Play"
          className="playButton"
          onClick={startGame}
          disabled={gens.length === 0 || options === null}
        />
      </BrowserView>
      <MobileView>
        <input
          type="image"
          alt="Play"
          className="playButtonMobile"
          src={playImage}
          onClick={startGame}
          disabled={gens.length === 0 || options === null}
        />
      </MobileView>
    </div>
  );
};

export default WelcomeScreen;
