import React, { useState, useEffect } from "react";
import BoardPresentation from "./boardPresentation";
const BoardContainer = (props) => {
  const [array, setArray] = useState(null);
  const [mineStepped, setMineStepped] = useState(false);
  const [gameRestart, setGameRestart] = useState(false);
  const [won, setWon] = useState(false);
  const [score, setScore] = useState(null);
  useEffect(() => {
    setScore(0);
    const tempArray = Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => {
        return { clicked: false, value: 0, isMine: false };
      })
    );
    let x;
    props.gameDifficulty === "Easy"
      ? (x = 10)
      : props.gameDifficulty === "Medium"
      ? (x = 15)
      : (x = 20);
    while (x > 0) {
      const i = Math.floor(Math.random() * 10 + 1) - 1;
      const j = Math.floor(Math.random() * 10 + 1) - 1;

      if (!tempArray[i][j].isMine) {
        tempArray[i][j].isMine = true;
        --x;
      }
    }
    setArray(tempArray);
  }, [gameRestart]);
  const restartGame = () => {
    setGameRestart(!gameRestart);
    setMineStepped(false);
  };
  const clicked = (i, j) => {
    const tempArray = [...array];
    if (tempArray[i][j].clicked) {
      return;
    } else if (tempArray[i][j].isMine) {
      tempArray[i][j].clicked = true;
      tempArray.forEach((item, index) => {
        item.forEach((it, i) => {
          if (tempArray[index][i].isMine) {
            tempArray[index][i].clicked = true;
          }
        });
      });
      setArray(tempArray);
      setMineStepped(true);
    } else {
      tempArray[i][j].clicked = true;
      if (i - 1 >= 0) {
        if (tempArray[i - 1][j].isMine) {
          tempArray[i][j].value += 1;
        }
      }
      if (i + 1 <= 9) {
        if (tempArray[i + 1][j].isMine) {
          tempArray[i][j].value += 1;
        }
      }
      if (j - 1 >= 0) {
        if (i - 1 >= 0) {
          if (tempArray[i - 1][j - 1].isMine) {
            tempArray[i][j].value += 1;
          }
        }
        if (tempArray[i][j - 1].isMine) {
          tempArray[i][j].value += 1;
        }
        if (i + 1 <= 9) {
          if (tempArray[i + 1][j - 1].isMine) {
            tempArray[i][j].value += 1;
          }
        }
      }

      if (j + 1 <= 9) {
        if (i - 1 >= 0) {
          if (tempArray[i - 1][j + 1].isMine) {
            tempArray[i][j].value++;
          }
        }
        if (tempArray[i][j + 1].isMine) {
          tempArray[i][j].value++;
        }
        if (i + 1 <= 9) {
          if (tempArray[i + 1][j + 1].isMine) {
            tempArray[i][j].value++;
          }
        }
      }
      let scre = score;
      props.gameDifficulty === "Easy"
        ? (scre = scre + 1)
        : props.gameDifficulty === "Medium"
        ? (scre = scre + 2)
        : (scre = scre + 3);
      setScore(scre);
      if (
        (props.gameDifficulty === "Easy" && scre === 90) ||
        (props.gameDifficulty === "Medium" && scre === 170) ||
        (props.gameDifficulty === "Hard" && scre === 240)
      ) {
        setWon(true);
        setMineStepped(true);
      }
    }
    setArray(tempArray);
  };
  return (
    <BoardPresentation
      mineStepped={mineStepped}
      clicked={clicked}
      array={array}
      restart={restartGame}
      backHome={props.backHome}
      won={won}
      score={score}
      gameDifficulty={props.gameDifficulty}
    />
  );
};

export default BoardContainer;
