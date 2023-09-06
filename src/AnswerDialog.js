import { useEffect, useState } from "react";

const AnswerDialog = ({ names, randI, setShowAnswer, nextPokemon }) => {
  const [time, setTime] = useState(5);
  // const time = useRef(5);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (time <= 1) {
        setShowAnswer(false);
        nextPokemon();
      } else {
        setTime((t) => t - 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [time]);

  useEffect(() => {
    const handleSpace = (e) => {
      if (e.key === " ") {
        setShowAnswer(false);
        nextPokemon();
      }
    };
    document.addEventListener("keydown", handleSpace);

    return () => document.removeEventListener("keydown", handleSpace);
  }, []);

  return (
    <>
      <div>
        <b style={{ fontSize: "4vh" }}>{names[randI]}</b>
        <p style={{ fontSize: "2vh" }}>{time} (press space to skip)</p>
      </div>
    </>
  );
};

export default AnswerDialog;
