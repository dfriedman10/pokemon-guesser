import "./PokeImage.css";

const PokeImage = ({ pokeNumber, showAnswer, names }) => {
  const formattedNumber =
    (pokeNumber < 100 ? "0" : "") + (pokeNumber < 10 ? "0" : "") + pokeNumber;

  return (
    <img
      draggable="false"
      className={showAnswer ? "" : "silhouetted"}
      src={
        "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" +
        formattedNumber +
        ".png"
      }
      alt={names[pokeNumber - 1]}
    />
  );
};

export default PokeImage;
