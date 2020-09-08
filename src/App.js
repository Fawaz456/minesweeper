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
  //function to get user input values and difficulty then start the game
  const startGame = (obj) => {
    setGameDifficulty(obj.difficulty); //Set the game difficulty recieved from home
    //if game difficulty is custom
    if (obj.difficulty === "Custom") {
      setRows(obj.rows); //set the custom rows recieved from user
      setColumns(obj.columns); //set the custom columns recieved from user
      setMines(obj.mines); //set the custom mines recieved from user
    }
    setGameStarted(true); //show the grid board
  };
  //function to return back home from game at any time
  const backHome = () => {
    setGameStarted(false); //hide the grid board and display landing view(home)
  };
  /* 
  The components architecture is build using simple .js,container.js and presenation.js
  simple .js used to import the component in other components.
  container.js used to do the logical part related to the component.
  presenatation.js used to display the view of the component.
  */
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
