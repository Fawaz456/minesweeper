import React, { useState } from "react";
import "./App.css";
import Board from "../src/components/board/board";
import Home from "../src/components/home/home";
const App = () => {
  const [gameStarted, setGameStarted] = useState(false); //state to display grid
  const [gameDifficulty, setGameDifficulty] = useState(""); //state to pass difficulty to grid
  const [rows, setRows] = useState(null); //state for custom board row
  const [columns, setColumns] = useState(null); //state for custom board columns
  const [mines, setMines] = useState(null); //state for custom mines
  const startGame = (obj) => {
    setGameDifficulty(obj.difficulty); //Set the game difficulty recieved from home
    if (obj.difficulty === "Custom") {
      //if game difficulty is custom
      setRows(obj.rows); //set the custom rows recieved from user
      setColumns(obj.columns); //set the custom columns recieved from user
      setMines(obj.mines); //set the custom mines recieved from user
    }
    setGameStarted(true); //show the grid board
  };
  const backHome = () => {
    setGameStarted(false); //hide the grid board and display landing view(home)
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
