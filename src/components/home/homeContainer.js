import React, { useState } from "react";
import HomePresentation from "./homePresentation";
const HomeContainer = (props) => {
  const [difficulty, setDifficulty] = useState("Easy");
  return (
    <HomePresentation
      difficulty={difficulty}
      changeDifficulty={(event) => {
        setDifficulty(event.target.value);
      }}
      startGame={()=>props.startGame(difficulty)}
    />
  );
};

export default HomeContainer;
