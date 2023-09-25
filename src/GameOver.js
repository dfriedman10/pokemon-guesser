import { useState } from "react";
import * as constants from "./data";
import "./GameOver.css";

// COMPLETE ALL IN FREE PLAY => CAN GO ON LEADERBOARD

import {
  orderBy,
  limit,
  query,
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";

const GameOver = ({
  complete,
  stats,
  setStats,
  setPhase,
  setOptions,
  options,
  db,
  gens,
}) => {
  const [name, setName] = useState("");
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaders, setLeaders] = useState([]);

  async function enterScore(key) {
    if (name.trim().length > 0 && key === "Enter") {
      try {
        const docRef = await addDoc(collection(db, "scores"), {
          name: name.trim(),
          score: stats.score,
          correct: stats.correct,
          activeGens: gens,
        });
        // console.log("Document written with ID: ", docRef.id);
        const q = query(
          collection(db, "scores"),
          orderBy("score", "desc"),
          limit(20)
        );
        const snapshot = await getDocs(q);
        // const docs = [];
        // snapshot.forEach((doc) => {
        //   docs.push(doc);
        // });

        setLeaders(snapshot.docs);
        setShowLeaderboard(true);
        // console.log(docs);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  }
  // console.log(leaders);
  // leaders.forEach((l) => console.log(l.data().name));
  return (
    <div className="gameOverContainer">
      {showLeaderboard ? (
        <>
          <h2 style={{ fontSize: "4vmin" }}>Leaderboard</h2>
          <table className="leaderboardTable">
            <thead>
              <tr style={{ width: "100%" }}>
                <th className="leaderboardElement">Name</th>
                <th className="leaderboardElement">Score</th>
                <th className="leaderboardElement">Correct</th>
                <th className="leaderboardElement">Generations</th>
              </tr>
            </thead>
            <tbody>
              {leaders.map((leader) => {
                const data = leader.data();
                return (
                  <tr key={leader.id}>
                    <td>{data.name}</td>
                    <td>{data.score}</td>

                    <td style={{ paddingLeft: "4vw" }}>{data.correct}</td>

                    <td>{data.activeGens && data.activeGens.toString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <h2 className="gameOverTitle">
            {complete ? "Congratulations!" : "Game Over"}
          </h2>
          {complete ? (
            <h3 style={{ fontSize: "4vmin" }}>
              You named every Pokemon in the selected generations (
              <span style={{ color: "blue" }}>{stats.correct}</span> total)!
              Your score is{" "}
              <span style={{ color: "green" }}>{stats.score}</span>
            </h3>
          ) : (
            <h3 style={{ fontSize: "4vmin" }}>
              {" "}
              You got <span style={{ color: "blue" }}>
                {stats.correct}
              </span>{" "}
              correct for a score of{" "}
              <span style={{ color: "green" }}>{stats.score}</span>
            </h3>
          )}
          <h3> Enter your name for the leaderboard:</h3>
          <input
            className="leaderboardEntryBox"
            autoFocus
            type="text"
            maxLength="10"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => enterScore(e.key)}
          />
          or
        </>
      )}
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
    </div>
  );
};

export default GameOver;
