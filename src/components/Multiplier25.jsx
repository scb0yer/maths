import { useState, useEffect } from "react";

const Multiplier25 = ({
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

  useEffect(() => {
    const number1 = Math.floor(Math.random() * 15) + 1;
    setNb1(number1);
    setNb2(25);
  }, [restart]);

  const calcul = () => {
    const newScore = [...score];
    const answer = nb1 * nb2;
    if (result.toString() === answer.toString()) {
      setResponse("Bien joué !");
      newScore.push(1);
    } else {
      setResponse(
        `La bonne réponse était ${answer}, pour multiplier par 25, il faut se rappeler que 25 x 4 = 100. Tu cherches combien de fois il y a 4 dans ton nombre à multiplier pour avoir les centaines, puis tu complètes 25, 50, 75...`
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
export default Multiplier25;
