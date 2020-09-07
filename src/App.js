import React, { useState } from "react";
import "./App.css";
import Board from "../src/components/board/board";
import Home from "../src/components/home/home";
const App = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameDifficulty, setGameDifficulty] = useState("");
  const startGame = (val) => {
    setGameDifficulty(val);
    setGameStarted(true);
  };
  const backHome = () => {
    setGameStarted(false);
  };
  return (
    <React.Fragment>
      {!gameStarted ? (
        <Home startGame={startGame} />
      ) : (
        <Board gameDifficulty={gameDifficulty} backHome={backHome} />
      )}
    </React.Fragment>
  );
};

export default App;
