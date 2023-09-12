import "./PokeImage.css";

const PokeImage = ({ pokeNumber, showAnswer, name }) => {
  const formattedNumber =
    (pokeNumber < 100 ? "0" : "") + (pokeNumber < 10 ? "0" : "") + pokeNumber;

  return (
    <img
      draggable="false"
      className={"pokeImg" + (showAnswer ? "" : "Silhouetted")}
      alt={name}
      src={
        "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" +
        formattedNumber +
        ".png"
      }
    />
  );
};

export default PokeImage;
