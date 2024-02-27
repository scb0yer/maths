import { useState, useEffect } from "react";

const Milliers = ({
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
  const [nb1S, setNb1S] = useState();
  const [nb2, setNb2] = useState();
  const [nb2S, setNb2S] = useState();

  useEffect(() => {
    const number1 = Math.floor(Math.random() * 999999);
    const string = number1.toString();
    const length = string.length;
    const index = Math.floor(Math.random() * (length - 2));
    const d = string[index];
    const u = string[index + 1];
    const d10 = Number(d) * 10 ** (length - index - 1);
    const u1 = Number(u) * 10 ** (length - index - 2);
    const number2 = d10 + u1;
    setNb1(number1);
    setNb1S(displaynumber(number1));
    setNb2(number2);
    setNb2S(displaynumber(number2));
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
        `La bonne réponse était ${answer}, as-tu bien vu qu'il y avait le nombre ${nb2S} dans ${nb1S} ?`
      );
      newScore.push(0);
    }
    setScore(newScore);
    return;
  };

  return (
    <div>
      <div>
        {nb1S} - {nb2S}
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
export default Milliers;
