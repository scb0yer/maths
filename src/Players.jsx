import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [tables, setTables] = useState([]);
  const [newEleves, setNewEleves] = useState("");
  const [eleves, setEleves] = useState([]);
  const [nextEleves, setNextEleves] = useState(null);
  const [count, setCount] = useState({ tables: 0, set: 1 });

  const initialize = () => {
    const elevesTab = [];
    const elevesList = newEleves.split(" ");
    if (elevesList < 5) {
      alert("Le nombre de participants doit être supérieur à 4 !");
    } else {
      for (let e = 0; e < elevesList.length; e++) {
        elevesTab.push(elevesList[e]);
      }
      setEleves(elevesTab);
      setNewEleves("");
    }
  };

  useEffect(() => {
    const newPlayers = [];
    console.log(eleves.length);
    for (let e = 0; e < eleves.length; e++) {
      const table = Math.floor(e / 3);
      if (e % 3 !== 2) {
        newPlayers.push({
          nom: eleves[e],
          role: "joueur",
          table,
          points: 0,
          set: 1,
        });
      } else {
        newPlayers.push({
          nom: eleves[e],
          role: "observateur",
          table,
          points: 0,
          set: 1,
        });
      }
    }
    setPlayers(newPlayers);
    const newTables = [];
    for (let t = 0; t < Math.ceil(eleves.length / 3); t++) {
      newTables.push(`table ${t + 1}`);
    }
    setTables(newTables);
  }, [eleves]);

  const win = (index) => {
    setNextEleves(null);
    const newPlayers = [...players];
    if (newPlayers[index].set > count.set) {
      alert(`Il faut attendre que le set ${count.set} soit terminé !`);
    } else if (newPlayers[index].role === "observateur") {
      alert("Seul un joueur peut gagner !");
    } else {
      const newCount = count;
      newCount.tables++;
      setCount(newCount);
      if (newCount.tables === tables.length) {
        const newCount = count;
        newCount.set++;
        newCount.tables = 0;
        setCount(newCount);
      }
      const table = newPlayers[index].table;
      const set = newPlayers[index].set;
      console.log(tables.length, table);
      if (table + 1 === tables.length - 1 && newPlayers.length % 3 > 0) {
        newPlayers[index].table = table + 1;
        newPlayers[index].role = "joueur";
      } else if (
        table + 1 === tables.length - 2 &&
        newPlayers.length % 3 === 1
      ) {
        newPlayers[index].table = table + 1;
        newPlayers[index].role = "joueur";
      } else if (table < tables.length - 1) {
        newPlayers[index].table = table + 1;
        newPlayers[index].role = "observateur";
      }
      newPlayers[index].points++;
      newPlayers[index].set++;
      for (let p = 0; p < newPlayers.length; p++) {
        if (newPlayers[p].set === set) {
          if (
            newPlayers[p].table === table &&
            newPlayers[p].role === "joueur"
          ) {
            newPlayers[p].set++;
            newPlayers[p].role = "joueur";
            if (table > 0) {
              newPlayers[p].table = table - 1;
            } else if (table === 0) {
              newPlayers[p].role = "observateur";
            }
          } else if (
            newPlayers[p].table === table &&
            newPlayers[p].role === "observateur"
          ) {
            newPlayers[p].set++;
            newPlayers[p].role = "joueur";
          }
        }
      }
      setPlayers(newPlayers);
    }
  };

  const saveRanks = () => {
    setNextEleves(null);
    const results = [];
    for (let t = 0; t < tables.length; t++) {
      for (let p = 0; p < players.length; p++) {
        if (players[p].table === t) {
          results.push(players[p].nom);
          console.log("OK");
        }
      }
    }
    const rank = results.join(" ");
    console.log(results);
    console.log(rank);
    setNextEleves(rank);
  };
  return (
    <main>
      <h1>Défi Tables</h1>
      <h2>Set n° {count.set}</h2>
      {eleves.length < 1 && (
        <>
          <div className="consigne">
            Écris le prénom de chaque élève participant, séparés seulement d'un
            espace.
          </div>
          <div>
            <input
              className="elevesList"
              type="text"
              value={newEleves}
              placeholder="Élève1 Élève2 Élève3 Élève4 Élève5"
              onChange={(event) => {
                setNewEleves(event.target.value);
              }}
            />
          </div>
          <button
            className="btn"
            onClick={() => {
              initialize();
            }}
          >
            Lancer le tirage
          </button>
        </>
      )}

      {eleves.length > 1 && (
        <>
          {" "}
          <div className="consigne">
            À la fin de chaque match, clique sur le gagnant de chaque table. Tu
            ne peux cliquer que sur les joueurs en bleu. Tous les joueurs
            redeviennent bleus quand le set est terminé.
          </div>
          <br />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "30px" }}>
            {tables.map((table, num) => {
              return (
                <div key={num}>
                  <h3>{table}</h3>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "15px",
                    }}
                  >
                    {players.map((player, index) => {
                      return (
                        player.table === num && (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                            key={index}
                          >
                            <button
                              className="eleves"
                              style={{
                                backgroundColor:
                                  player.set === count.set
                                    ? "#2D3047"
                                    : "white",
                                color:
                                  player.set === count.set
                                    ? "white"
                                    : "#2D3047",
                                borderColor:
                                  player.set === count.set
                                    ? "white"
                                    : "#2D3047",
                              }}
                              onClick={() => {
                                win(index);
                              }}
                            >
                              {player.nom}
                            </button>
                            <div>
                              {player.role} {""}:{""}
                              {player.points}
                            </div>
                          </div>
                        )
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <br />
          <div className="consigne">
            Quand la session est terminée, tu peux récupérer la liste des élèves
            et la copier quelque part pour la prochaine fois (ils seront
            assignés aux mêmes tables qu'à la fin de cette session.)
          </div>
          <div>
            <br />
            <button
              className="btn"
              onClick={() => {
                saveRanks();
              }}
            >
              Récupérer la liste des élèves
            </button>
          </div>
          <br />
          <div
            style={{
              borderColor: "#2D3047",
              borderStyle: "solid",
              borderWidth: "1px",
              borderRadius: "10px",
              padding: "5px",
            }}
          >
            {nextEleves}
          </div>
        </>
      )}

      <div>
        <br />
        <Link to="/">
          <button className="retour-btn">Retour au Défi Maths</button>
        </Link>
      </div>
    </main>
  );
};
export default Players;
