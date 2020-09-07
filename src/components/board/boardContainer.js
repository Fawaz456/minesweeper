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
    let tempArray;
    if (props.gameDifficulty !== "Custom") {
      tempArray = Array.from({ length: 10 }, () =>
        Array.from({ length: 10 }, () => {
          return { clicked: false, value: 0, isMine: false };
        })
      );
    } else {
      tempArray = Array.from({ length: props.rows }, () =>
        Array.from({ length: props.columns }, () => {
          return { clicked: false, value: 0, isMine: false };
        })
      );
    }
    let x;
    props.gameDifficulty === "Easy"
      ? (x = 10)
      : props.gameDifficulty === "Medium"
      ? (x = 15)
      : props.gameDifficulty === "Hard"
      ? (x = 20)
      : (x = props.mines);
    while (x > 0) {
      let i, j;
      if (props.gameDifficulty !== "Custom") {
        i = Math.floor(Math.random() * 10 + 1) - 1;
        j = Math.floor(Math.random() * 10 + 1) - 1;
      } else {
        i = Math.floor(Math.random() * props.rows + 1) - 1;
        j = Math.floor(Math.random() * props.columns + 1) - 1;
      }

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
      //   if (props.gameDifficulty !== "Custom") {
      let scre = score;
      tempArray[i][j].clicked = true;
      props.gameDifficulty === "Easy" || props.gameDifficulty === "Custom"
        ? (scre = scre + 1)
        : props.gameDifficulty === "Medium"
        ? (scre = scre + 2)
        : (scre = scre + 3);
      if (i - 1 >= 0) {
        if (tempArray[i - 1][j].isMine) {
          tempArray[i][j].value += 1;
        } else {
          if (!tempArray[i - 1][j].clicked) {
            tempArray[i - 1][j].clicked = true;
            props.gameDifficulty === "Easy" || props.gameDifficulty === "Custom"
              ? (scre = scre + 1)
              : props.gameDifficulty === "Medium"
              ? (scre = scre + 2)
              : (scre = scre + 3);
          }
        }
      }
      if (i + 1 <= tempArray.length - 1) {
        if (tempArray[i + 1][j].isMine) {
          tempArray[i][j].value += 1;
        } else {
          if (!tempArray[i + 1][j].clicked) {
            tempArray[i + 1][j].clicked = true;
            props.gameDifficulty === "Easy" || props.gameDifficulty === "Custom"
              ? (scre = scre + 1)
              : props.gameDifficulty === "Medium"
              ? (scre = scre + 2)
              : (scre = scre + 3);
          }
        }
      }
      if (j - 1 >= 0) {
        if (i - 1 >= 0) {
          if (tempArray[i - 1][j - 1].isMine) {
            tempArray[i][j].value += 1;
          } else {
            if (!tempArray[i - 1][j - 1].clicked) {
              tempArray[i - 1][j - 1].clicked = true;
              props.gameDifficulty === "Easy" ||
              props.gameDifficulty === "Custom"
                ? (scre = scre + 1)
                : props.gameDifficulty === "Medium"
                ? (scre = scre + 2)
                : (scre = scre + 3);
            }
          }
        }
        if (tempArray[i][j - 1].isMine) {
          tempArray[i][j].value += 1;
        } else {
          if (!tempArray[i][j - 1].clicked) {
            tempArray[i][j - 1].clicked = true;
            props.gameDifficulty === "Easy" || props.gameDifficulty === "Custom"
              ? (scre = scre + 1)
              : props.gameDifficulty === "Medium"
              ? (scre = scre + 2)
              : (scre = scre + 3);
          }
        }
        if (i + 1 <= tempArray.length - 1) {
          if (tempArray[i + 1][j - 1].isMine) {
            tempArray[i][j].value += 1;
          } else {
            if (!tempArray[i + 1][j - 1].clicked) {
              tempArray[i + 1][j - 1].clicked = true;
              props.gameDifficulty === "Easy" ||
              props.gameDifficulty === "Custom"
                ? (scre = scre + 1)
                : props.gameDifficulty === "Medium"
                ? (scre = scre + 2)
                : (scre = scre + 3);
            }
          }
        }
      }

      if (j + 1 <= tempArray[i].length - 1) {
        if (i - 1 >= 0) {
          if (tempArray[i - 1][j + 1].isMine) {
            tempArray[i][j].value++;
          } else {
            if (!tempArray[i - 1][j + 1].clicked) {
              tempArray[i - 1][j + 1].clicked = true;
              props.gameDifficulty === "Easy" ||
              props.gameDifficulty === "Custom"
                ? (scre = scre + 1)
                : props.gameDifficulty === "Medium"
                ? (scre = scre + 2)
                : (scre = scre + 3);
            }
          }
        }
        if (tempArray[i][j + 1].isMine) {
          tempArray[i][j].value++;
        } else {
          if (!tempArray[i][j + 1].clicked) {
            tempArray[i][j + 1].clicked = true;
            props.gameDifficulty === "Easy" || props.gameDifficulty === "Custom"
              ? (scre = scre + 1)
              : props.gameDifficulty === "Medium"
              ? (scre = scre + 2)
              : (scre = scre + 3);
          }
        }
        if (i + 1 <= tempArray.length - 1) {
          if (tempArray[i + 1][j + 1].isMine) {
            tempArray[i][j].value++;
          } else {
            if (!tempArray[i + 1][j + 1].clicked) {
              tempArray[i + 1][j + 1].clicked = true;
              props.gameDifficulty === "Easy" ||
              props.gameDifficulty === "Custom"
                ? (scre = scre + 1)
                : props.gameDifficulty === "Medium"
                ? (scre = scre + 2)
                : (scre = scre + 3);
            }
          }
        }
      }
      setScore(scre);
      if (
        (props.gameDifficulty === "Easy" && scre === 90) ||
        (props.gameDifficulty === "Medium" && scre === 170) ||
        (props.gameDifficulty === "Hard" && scre === 240) ||
        (props.gameDifficulty === "Custom" &&
          scre === props.rows * props.columns - props.mines)
      ) {
        setWon(true);
        setMineStepped(true);
      }
      //   } else {
      //     alert("IT is custom");
      //   }
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
