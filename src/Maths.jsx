import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Complements1 from "./components/Complements1";
import Complements2 from "./components/Complements2";
import Milliers from "./components/Milliers";
import Multiplier from "./components/Multiplier";
import Multiplier100 from "./components/Multiplier100";
import Multiplier25 from "./components/Multiplier25";
import Soustraction from "./components/Soustraction";
import Suite from "./components/Suite";
import Multiplier5 from "./components/Multiplier5";
import Recomposition from "./components/Recomposition";
import validate from "./assets/validate.png";
import cancel from "./assets/cancel.png";

const Maths = () => {
  const [index, setIndex] = useState();
  const [restart, setRestart] = useState();
  const [response, setResponse] = useState(null);
  const [result, setResult] = useState("");
  const [newCalcul, setNewCalcul] = useState(false);
  const [score, setScore] = useState([]);
  const [saveVisible, setSaveVisible] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [count, setCount] = useState(1);

  useEffect(() => {
    const alea = Math.floor(Math.random() * strategies.length);
    setIndex(alea);
    setResponse(null);
  }, [restart]);

  const checkScore = () => {
    if (score.length < 5) {
      alert(
        "Tu dois faire au moins 5 calculs avant d'enregistrer tes résultats."
      );
    } else {
      setSaveVisible(true);
    }
  };

  const save = async () => {
    try {
      if (!name || !password) {
        alert(
          "Tu dois renseigner ton prénom (avec une majuscule) et le code de la classe."
        );
      } else {
        const { data } = await axios.post(
          "https://site--perso--dzk9mdcz57cb.code.run/MATHS/addResults",
          { name, password, score }
        );
        console.log(data);
        alert("Tes résultats ont bien été enregistrés.");
        setSaveVisible(false);
        setCount(1);
        setRestart(!restart);
        setResult(null);
        setNewCalcul(false);
        setScore([]);
      }
    } catch (error) {
      alert("Le mot de passe ou le prénom est incorrect.");
      console.log(error.message);
    }
  };

  const strategies = [
    "Soustraire terme à terme",
    "Les compléments à 10",
    "Les compléments à 100",
    "Enlever des dizaines, centaines, unités de mille...",
    "Multiplier par 10 ou 100",
    "Une série de nombre identiques",
    "Multiplier par 25",
    "Une suite de nombres",
    "Multiplier par 5",
    "Recomposer une multiplication",
  ];

  return (
    <main>
      <h1>Défi Maths</h1>
      <div className="center">
        <div> Calcul n° {count}</div>
        {strategies[index] === "Soustraire terme à terme" && (
          <Soustraction
            restart={restart}
            response={response}
            setResponse={setResponse}
            result={result}
            setResult={setResult}
            setNewCalcul={setNewCalcul}
            setScore={setScore}
            score={score}
            newCalcul={newCalcul}
            strategie={strategies[index]}
          />
        )}
        {strategies[index] === "Les compléments à 10" && (
          <Complements1
            restart={restart}
            response={response}
            setResponse={setResponse}
            result={result}
            setResult={setResult}
            setNewCalcul={setNewCalcul}
            setScore={setScore}
            score={score}
            newCalcul={newCalcul}
            strategie={strategies[index]}
          />
        )}
        {strategies[index] === "Les compléments à 100" && (
          <Complements2
            restart={restart}
            response={response}
            setResponse={setResponse}
            result={result}
            setResult={setResult}
            setNewCalcul={setNewCalcul}
            setScore={setScore}
            score={score}
            newCalcul={newCalcul}
            strategie={strategies[index]}
          />
        )}
        {strategies[index] ===
          "Enlever des dizaines, centaines, unités de mille..." && (
          <Milliers
            restart={restart}
            response={response}
            setResponse={setResponse}
            result={result}
            setResult={setResult}
            setNewCalcul={setNewCalcul}
            setScore={setScore}
            score={score}
            newCalcul={newCalcul}
            strategie={strategies[index]}
          />
        )}
        {strategies[index] === "Multiplier par 10 ou 100" && (
          <Multiplier100
            restart={restart}
            response={response}
            setResponse={setResponse}
            result={result}
            setResult={setResult}
            setNewCalcul={setNewCalcul}
            setScore={setScore}
            score={score}
            newCalcul={newCalcul}
            strategie={strategies[index]}
          />
        )}
        {strategies[index] === "Une série de nombre identiques" && (
          <Multiplier
            restart={restart}
            response={response}
            setResponse={setResponse}
            result={result}
            setResult={setResult}
            setNewCalcul={setNewCalcul}
            setScore={setScore}
            score={score}
            newCalcul={newCalcul}
            strategie={strategies[index]}
          />
        )}
        {strategies[index] === "Multiplier par 25" && (
          <Multiplier25
            restart={restart}
            response={response}
            setResponse={setResponse}
            result={result}
            setResult={setResult}
            setNewCalcul={setNewCalcul}
            setScore={setScore}
            score={score}
            newCalcul={newCalcul}
            strategie={strategies[index]}
          />
        )}
        {strategies[index] === "Une suite de nombres" && (
          <Suite
            restart={restart}
            response={response}
            setResponse={setResponse}
            result={result}
            setResult={setResult}
            setNewCalcul={setNewCalcul}
            setScore={setScore}
            score={score}
            newCalcul={newCalcul}
            strategie={strategies[index]}
          />
        )}
        {strategies[index] === "Multiplier par 5" && (
          <Multiplier5
            restart={restart}
            response={response}
            setResponse={setResponse}
            result={result}
            setResult={setResult}
            setNewCalcul={setNewCalcul}
            setScore={setScore}
            score={score}
            newCalcul={newCalcul}
            strategie={strategies[index]}
          />
        )}
        {strategies[index] === "Recomposer une multiplication" && (
          <Recomposition
            restart={restart}
            response={response}
            setResponse={setResponse}
            result={result}
            setResult={setResult}
            setNewCalcul={setNewCalcul}
            setScore={setScore}
            score={score}
            newCalcul={newCalcul}
            strategie={strategies[index]}
          />
        )}
      </div>
      <div className="center">
        {newCalcul && (
          <>
            <button
              className="calcul-btn"
              onClick={() => {
                setRestart(!restart);
                setResult(null);
                setNewCalcul(false);
                setCount(count + 1);
              }}
            >
              Nouveau calcul
            </button>

            <button
              className="calcul-btn"
              onClick={() => {
                checkScore();
              }}
            >
              Enregistrer
            </button>
            {saveVisible && (
              <>
                <input
                  className="input-save"
                  type="text"
                  value={password}
                  placeholder="code"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
                <input
                  className="input-save"
                  type="text"
                  value={name}
                  placeholder="Prénom"
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
                <div className="validate-cancel">
                  <div>
                    <img
                      className="validate"
                      src={validate}
                      alt="valider"
                      onClick={() => {
                        save();
                      }}
                    />
                  </div>
                  <div>
                    <img
                      className="cancel"
                      src={cancel}
                      alt="cancel"
                      onClick={() => {
                        setSaveVisible(false);
                      }}
                    />
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
      <br />
      <div>
        <Link to="/defi-tables">
          <button className="retour-btn">Défi Tables</button>
        </Link>
      </div>
    </main>
  );
};

export default Maths;
