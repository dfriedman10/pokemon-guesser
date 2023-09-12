import "./Switch.css";

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

export default Switch;
