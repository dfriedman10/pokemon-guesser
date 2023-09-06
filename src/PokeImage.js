import "./PokeImage.css";

const PokeImage = ({ pokeNumber, showAnswer, names }) => {
  const formattedNumber =
    (pokeNumber < 100 ? "0" : "") + (pokeNumber < 10 ? "0" : "") + pokeNumber;

  return (
    <img
      draggable="false"
      className={showAnswer ? "" : "silhouetted"}
      alt={names[pokeNumber - 1]}
      src={
        "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" +
        formattedNumber +
        ".png"
      }
    />
  );
};

export default PokeImage;
