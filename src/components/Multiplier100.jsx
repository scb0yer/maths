import { useState, useEffect } from "react";
import picto from "../assets/clue.png";

const Multiplier100 = ({
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
  const [clue, setClue] = useState(false);

  useEffect(() => {
    const number1 = Math.floor(Math.random() * 9997) + 2;
    setNb1(number1);
    setNb1S(displaynumber(number1));
    const alea = Math.floor(Math.random() * 2);
    if (alea < 1) {
      setNb2(10);
    } else {
      setNb2(100);
    }
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
    const answer = nb1 * nb2;
    if (result.toString() === answer.toString()) {
      setResponse("Bien joué !");
      newScore.push(1);
    } else {
      setResponse(
        `La bonne réponse était ${answer}, pour multiplier par 10, il faut faire passer les unités dans les dizaines (car 1 x 10 unités, ça fait 1 dizaine) et rajouter un 0 dans les unités. Si on veut multiplier par 100, il faut le faire deux fois, donc ajouter deux 00 (un pour les unités, un pour les dizaines).`
      );
      newScore.push(0);
    }
    setScore(newScore);
    return;
  };

  return (
    <div>
      <div className="flex">
        {nb1S} x {nb2}{" "}
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
export default Multiplier100;
