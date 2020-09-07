import React, { useState } from "react";
import "./App.css";
import Board from "../src/components/board/board";
import Home from "../src/components/home/home";
const App = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameDifficulty, setGameDifficulty] = useState("");
  const [rows, setRows] = useState(null);
  const [columns, setColumns] = useState(null);
  const [mines, setMines] = useState(null);
  const startGame = (obj) => {
    console.log(obj);
    if (obj.difficulty !== "Custom") {
      setGameDifficulty(obj.difficulty);
      setGameStarted(true);
    } else {
      setGameDifficulty(obj.difficulty);
      setRows(obj.rows);
      setColumns(obj.columns);
      setMines(obj.mines);
      setGameStarted(true);
    }
  };
  const backHome = () => {
    setGameStarted(false);
  };
  return (
    <React.Fragment>
      {!gameStarted ? (
        <Home startGame={startGame} />
      ) : (
        <Board
          gameDifficulty={gameDifficulty}
          backHome={backHome}
          rows={rows}
          columns={columns}
          mines={mines}
        />
      )}
    </React.Fragment>
  );
};

export default App;
