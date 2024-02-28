import { useState, useEffect } from "react";
import picto from "../assets/clue.png";

const Recomposition = ({
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
  const [nb3, setNb3] = useState();
  const [clue, setClue] = useState(false);

  useEffect(() => {
    const number1 = Math.floor(Math.random() * 99995) + 4;
    setNb1(number1);
    setNb1S(displaynumber(number1));
    const number2 = Math.floor(Math.random() * 7) + 1;
    setNb2(number2);
    const number3 = 9 - number2;
    setNb3(number3);
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
    const answer = nb1 * 10;
    if (result.toString() === answer.toString()) {
      setResponse("Bien joué !");
      newScore.push(1);
    } else {
      setResponse(
        `La bonne réponse était ${answer}. Il y a en tout ${nb2} + ${nb3} + 1 fois ${nb1S}, ça fait 10 x ${nb1S}.`
      );
      newScore.push(0);
    }
    setScore(newScore);
    return;
  };

  return (
    <div>
      <div className="flex">
        ({nb1S} x {nb2}) + {nb1S} + ({nb3} x {nb1S}){" "}
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
export default Recomposition;
