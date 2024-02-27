import { useState, useEffect } from "react";

const Multiplier5 = ({
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
  const [nb1, setNb1] = useState();
  const [nb2, setNb2] = useState();

  useEffect(() => {
    const number1 = Math.floor(Math.random() * 495) * 2;
    setNb1(number1);
    setNb2(5);
  }, [restart]);

  const calcul = () => {
    const newScore = [...score];
    const answer = nb1 * nb2;
    if (result.toString() === answer.toString()) {
      setResponse("Bien joué !");
      newScore.push(1);
    } else {
      setResponse(
        `La bonne réponse était ${answer}, pour multiplier par 5, le plus facile est généralement de le diviser par 2 (trouver sa moitié) et le multiplier par 10 en ajoutant un "0" (parce que 2 x 5 = 10).`
      );
      newScore.push(0);
    }
    setScore(newScore);
    return;
  };

  return (
    <div>
      <div>
        {nb1} x {nb2}
      </div>
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
export default Multiplier5;
