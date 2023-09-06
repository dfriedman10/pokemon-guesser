import * as constants from "./data";
import "./GenChooser.css";

const GenChooser = ({
  setIndices,
  nextPokemon,
  setShowAnswer,
  randI,
  indices,
}) => {
  const genEnds = constants.genEnds;
  const handleCheck = (checked, gen) => {
    if (checked) {
      const thisGen = Array.from(
        Array(genEnds[gen] - genEnds[gen - 1]).keys()
      ).map((ind) => ind + genEnds[gen - 1]);

      const newIndices = [...indices, ...thisGen];
      if (indices.length == 0) {
        nextPokemon(newIndices);
      }
      setIndices(newIndices);
    } else {
      const newIndices = indices.filter(
        (ind) => ind >= genEnds[gen] || ind < genEnds[gen - 1]
      );

      if (randI < genEnds[gen] && randI >= genEnds[gen - 1]) {
        setShowAnswer(false);
        nextPokemon(newIndices);
      } else {
        setIndices(newIndices);
      }
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h2>Which Generations?</h2>
      {genEnds.slice(1).map((val, i) => (
        <label key={i}>
          <input
            type="checkbox"
            defaultChecked={true}
            onChange={(e) => handleCheck(e.target.checked, i + 1)}
          />
          Gen {i + 1}
        </label>
      ))}
    </div>
  );
};

export default GenChooser;
