import React, { useState } from "react";
import HomePresentation from "./homePresentation";
const HomeContainer = (props) => {
  const [difficulty, setDifficulty] = useState("Easy"); //state for user choosed difficulty
  const [customInput, setCustomInput] = useState(false); //state to display custom inputs if user choose diffculty as custom
  const [rows, setRows] = useState(null); //state to capture rows entered by user
  const [columns, setColumns] = useState(null); //state to capture columns entered by user
  const [mines, setMines] = useState(null); //state to capture mines entered by user
  const [snackOpen, setSnackOpen] = useState(false); //state passed to App.js if user input does not validate

  //function to start the game
  const startGame = () => {
    //check difficulty choosed by user
    if (difficulty === "Custom") {
      //if custom validate the input entered by user
      if (rows >= 5 && columns >= 5 && +mines < rows * columns && +mines > 4) {
        props.startGame({
          difficulty,
          rows: +rows,
          columns: +columns,
          mines: +mines,
        }); //pass the user input rows,columns and mines then start the game
      } else {
        setSnackOpen(true); //display alert if input validation fails
      }
    } else {
      //if difficulty choosed not custom,start the game with hardcoded rows,columns and mines
      props.startGame({ difficulty });
    }
  };

  //function to change difficulty as choosed by user
  const changeDifficulty = (event) => {
    //check if user choosed difficulty as custom
    if (event.target.value === "Custom") {
      setCustomInput(true); //display the inputs for custom board
      setRows(5); //set the least value for custom rows
      setColumns(5); //set the least value for custom columns
      setMines(5); //set the least value for custom mines
    } else {
      setCustomInput(false); //don't display inputs if difficulty choosed is not custom
    }
    setDifficulty(event.target.value); // set the user choosen difficulty
  };
  return (
    <HomePresentation
      difficulty={difficulty}
      changeDifficulty={changeDifficulty}
      startGame={startGame}
      customInput={customInput}
      columns={columns}
      rows={rows}
      mines={mines}
      setRows={(e) => setRows(e.target.value)}
      setColumns={(e) => setColumns(e.target.value)}
      setMines={(e) => setMines(e.target.value)}
      snackOpen={snackOpen}
      handleCloseAlert={() => setSnackOpen(false)}
    />
  );
};

export default HomeContainer;
