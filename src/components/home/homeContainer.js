import React, { useState } from "react";
import HomePresentation from "./homePresentation";
const HomeContainer = (props) => {
  const [difficulty, setDifficulty] = useState("Easy");
  const [customInput, setCustomInput] = useState(false);
  const [rows, setRows] = useState(5);
  const [columns, setColumns] = useState(5);
  const [mines, setMines] = useState(5);
  const startGame = () => {
    if (difficulty === "Custom") {
      console.log("mines", typeof mines);
      if (rows >= 5 && columns >= 5 && +mines < rows * columns && +mines>4) {
        props.startGame({ difficulty, rows:+rows, columns:+columns, mines: +mines });
      } else {
        alert("Inproper input");
      }
    } else {
      props.startGame({ difficulty });
    }
  };
  const changeDifficulty = (event) => {
    if (event.target.value === "Custom") {
      setCustomInput(true);
    }else{
        setCustomInput(false);
        setRows(5);
        setColumns(5);
        setMines(5);
    }
    setDifficulty(event.target.value);
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
    />
  );
};

export default HomeContainer;
