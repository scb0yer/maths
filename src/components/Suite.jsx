import { useState, useEffect } from "react";

const Suite = ({
  restart,
  response,
  setResponse,
  result,
  setResult,
  setNewCalcul,
  setScore,
  score,
  newCalcul,
}) => {
  const [nb, setNb] = useState([]);

  useEffect(() => {
    let number1 = Math.floor(Math.random() * 5) + 2;
    if (number1 % 2 === 0) {
      number1++;
    }
    const tab = [];
    const mid = Math.ceil(number1 / 2);
    const number2 = Math.floor(Math.random() * 15) + 5;
    for (let n = 1; n < number1 + 1; n++) {
      if (n < mid) {
        tab.push(number2 + n - mid);
      } else if (n === mid) {
        tab.push(number2);
      } else if (n > mid) {
        tab.push(number2 + n - mid);
      }
    }
    setNb(tab);
  }, [restart]);

  const calcul = () => {
    const newScore = [...score];
    let answer = 0;
    for (let n = 0; n < nb.length; n++) {
      answer += nb[n];
    }
    if (result.toString() === answer.toString()) {
      setResponse("Bien joué !");
      newScore.push(1);
    } else {
      setResponse(
        `La bonne réponse était ${answer}, pour additionner les termes d'une suite, il faut prendre celui du milieu et le multiplier par le nombre de termes.`
      );
      newScore.push(0);
    }
    setScore(newScore);
    return;
  };

  return (
    <div>
      <div>{nb.join(` + `)}</div>
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
          response
        ) : (
          <button
            className="calcul-btn"
            onClick={() => {
              if (result) {
                calcul();
                setResult("");
                setNewCalcul(true);
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
export default Suite;
