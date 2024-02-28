import { useState, useEffect } from "react";
import picto from "../assets/clue.png";

const Soustraction = ({
  restart,
  response,
  setResponse,
  result,
  setResult,
  setNewCalcul,
  setScore,
  score,
  newCalcul,
  strategie,
}) => {
  const [nb1, setNb1] = useState();
  const [nb1S, setNb1S] = useState();
  const [nb2, setNb2] = useState();
  const [nb2S, setNb2S] = useState();
  const [clue, setClue] = useState(false);

  useEffect(() => {
    const nb = Math.floor(Math.random() * 999997) + 2;
    const nbSous = Math.floor(Math.random() * nb);
    setNb1(nb);
    setNb1S(displaynumber(nb));
    setNb2(nbSous);
    setNb2S(displaynumber(nbSous));
  }, [restart]);

  const displaynumber = (number) => {
    const nombre = number.toString();
    const tab = nombre.split("");
    const newTab = [];

    for (let t = 0; t < tab.length; t++) {
      if (t === tab.length - 3) {
        newTab.push(` ${tab[t]}`);
      } else {
        newTab.push(`${tab[t]}`);
      }
    }
    return newTab.join("");
  };

  const calcul = () => {
    const newScore = [...score];
    const answer = nb1 - nb2;
    if (result.toString() === answer.toString()) {
      setResponse("Bien joué !");
      newScore.push(1);
    } else {
      setResponse(
        `La bonne réponse était ${answer}, as-tu bien commencé par les unités, sans oublier les retenues ?`
      );
      newScore.push(0);
    }
    setScore(newScore);
    return;
  };

  return (
    <div>
      <div className="flex">
        {nb1S} - {nb2S}{" "}
        <img
          src={picto}
          alt="indice"
          className="clue"
          onClick={() => {
            setClue(!clue);
          }}
        />
      </div>
      {clue && <p className="grey">{strategie}</p>}
      {!newCalcul && (
        <input
          className="result-input"
          type="text"
          value={result}
          placeholder="Résultat sans espace"
          onChange={(event) => {
            setResult(event.target.value);
          }}
        />
      )}
      <div className="consigne">
        {response ? (
          <>
            <div className="grey">{strategie}</div>
            <br />
            <div>{response}</div>
          </>
        ) : (
          <button
            className="calcul-btn"
            onClick={() => {
              if (result) {
                calcul();
                setResult("");
                setNewCalcul(true);
                setClue(false);
              } else {
                alert("Tu dois entrer une réponse pour la tester.");
              }
            }}
          >
            Valider
          </button>
        )}
      </div>
    </div>
  );
};
export default Soustraction;
