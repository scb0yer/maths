import { useState, useEffect } from "react";

const Complements1 = ({
  restart,
  response,
  setResponse,
  result,
  setResult,
  setNewCalcul,
  setScore,
  score,
}) => {
  const [nb1, setNb1] = useState();
  const [nb2, setNb2] = useState();
  const [nb3, setNb3] = useState();
  const [nb4, setNb4] = useState();

  useEffect(() => {
    const total = Math.floor(Math.random() * 6) + 3;
    const sstotal1 = (Math.floor(Math.random() * (total - 1)) + 1) * 100;
    const sstotal2 = total * 100 - sstotal1;
    const number1 = Math.floor(Math.random() * (sstotal1 - 1)) + 1;
    const number2 = sstotal1 - number1;
    const number3 = Math.floor(Math.random() * (sstotal2 - 1)) + 1;
    const number4 = sstotal2 - number3;
    setNb1(number1);
    setNb2(number2);
    setNb3(number3);
    setNb4(number4);
  }, [restart]);

  const calcul = () => {
    const newScore = [...score];
    const answer = nb1 + nb3 + nb4 + nb2;
    if (result.toString() === answer.toString()) {
      setResponse("Bien joué !");
      newScore.push(1);
    } else {
      setResponse(
        `La bonne réponse était ${answer}, Il fallait repérer les compléments à 100 en additionnant ${nb1} et ${nb2} puis ${nb3} et ${nb4}`
      );
      newScore.push(0);
    }
    setScore(newScore);
    return;
  };

  return (
    <div>
      <div>
        {nb1} + {nb2} + {nb3} + {nb4}
      </div>
      <input
        className="result-input"
        type="text"
        value={result}
        placeholder="Résultat sans espace"
        onChange={(event) => {
          setResult(event.target.value);
        }}
      />
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
export default Complements1;
