import * as constants from "./data";
import "./GenChooser.css";

const GenChooser = ({ setGens, gens }) => {
  const genEnds = constants.genEnds;

  const handleCheck = (checked, gen) => {
    if (checked) {
      setGens([...gens, gen]);
    } else {
      const newGens = gens.filter((g) => g !== gen);
      setGens(newGens);
    }
  };

  return (
    <form className="genGrid">
      {genEnds.slice(1).map((val, i) => (
        <label key={i}>
          <input
            style={{ width: "1.7vmin", height: "1.7vmin" }}
            type="checkbox"
            defaultChecked={gens.includes(i + 1)}
            onChange={(e) => handleCheck(e.target.checked, i + 1)}
          />
          Gen {i + 1}
        </label>
      ))}
    </form>
  );
};

export default GenChooser;
