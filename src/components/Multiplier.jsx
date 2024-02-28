import { useState, useEffect } from "react";
import picto from "../assets/clue.png";

const Multiplier = ({
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
  const [factor, setFactor] = useState();
  const [addition, setAddition] = useState();
  const [clue, setClue] = useState(false);

  useEffect(() => {
    const number1 = Math.floor(Math.random() * 8) + 1;
    const x = Math.floor(Math.random() * 7) + 2;
    setFactor(x);
    let operation = `${number1}`;
    for (let n = 1; n < x; n++) {
      operation += ` + ${number1}`;
    }
    setNb1(number1);
    setAddition(operation);
  }, [restart]);

  const calcul = () => {
    const newScore = [...score];
    const answer = nb1 * factor;
    if (result.toString() === answer.toString()) {
      setResponse("Bien joué !");
      newScore.push(1);
    } else {
      setResponse(
        `La bonne réponse était ${answer}. Pour additionner rapidement le même nombre, il suffit de le multiplier par le nombre de fois où il apparaît.`
      );
      newScore.push(0);
    }
    setScore(newScore);
    return;
  };

  return (
    <div>
      <div className="flex">
        {addition}{" "}
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
export default Multiplier;
