import * as constants from "./data";
import "./GenChooser.css";

const GenChooser = ({ setIndices, indices }) => {
  const genEnds = constants.genEnds;

  const handleCheck = (checked, gen) => {
    if (checked) {
      const thisGen = Array.from(
        Array(genEnds[gen] - genEnds[gen - 1]).keys()
      ).map((ind) => ind + genEnds[gen - 1]);

      const newIndices = [...indices, ...thisGen];

      setIndices(newIndices);
    } else {
      const newIndices = indices.filter(
        (ind) => ind >= genEnds[gen] || ind < genEnds[gen - 1]
      );
      setIndices(newIndices);
    }
  };

  return (
    <form className="genGrid">
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
    </form>
  );
};

export default GenChooser;
