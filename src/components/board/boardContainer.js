import React, { useState, useEffect } from "react";
import BoardPresentation from "./boardPresentation";
const BoardContainer = (props) => {
  const [array, setArray] = useState(null);
  const [mineStepped, setMineStepped] = useState(false);
  const [gameRestart, setGameRestart] = useState(false);
  const [won, setWon] = useState(false);
  const [score, setScore] = useState(null);
  const [flag, setFlag] = useState(null);
  useEffect(() => {
    setScore(0);
    let tempArray;
    if (props.gameDifficulty !== "Custom") {
      tempArray = Array.from({ length: 10 }, () =>
        Array.from({ length: 10 }, () => {
          return { clicked: false, value: 0, isMine: false, isFlag: false };
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
    setFlag(x);
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
    console.log(tempArray);
  }, [gameRestart]);
  const restartGame = () => {
    setGameRestart(!gameRestart);
    setMineStepped(false);
  };
  const clicked = async (i, j) => {
    const tempArray = [...array];
    // console.log(tempArray);
    if (tempArray[i][j].clicked || tempArray[i][j].isFlag) {
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
            const bool = await getBool(tempArray, i - 1, j);
            if (!bool && !tempArray[i - 1][j].isFlag) {
              tempArray[i - 1][j].clicked = true;
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
      if (i + 1 <= tempArray.length - 1) {
        if (tempArray[i + 1][j].isMine) {
          tempArray[i][j].value += 1;
        } else {
          if (!tempArray[i + 1][j].clicked) {
            const bool = await getBool(tempArray, i + 1, j);
            if (!bool && !tempArray[i + 1][j].isFlag) {
              tempArray[i + 1][j].clicked = true;
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
      if (j - 1 >= 0) {
        if (i - 1 >= 0) {
          if (tempArray[i - 1][j - 1].isMine) {
            tempArray[i][j].value += 1;
          } else {
            if (!tempArray[i - 1][j - 1].clicked) {
              const bool = await getBool(tempArray, i - 1, j - 1);
              if (!bool && !tempArray[i - 1][j - 1].isFlag) {
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
        }
        if (tempArray[i][j - 1].isMine) {
          tempArray[i][j].value += 1;
        } else {
          if (!tempArray[i][j - 1].clicked) {
            const bool = await getBool(tempArray, i, j - 1);
            if (!bool && !tempArray[i][j - 1].isFlag) {
              tempArray[i][j - 1].clicked = true;
              props.gameDifficulty === "Easy" ||
              props.gameDifficulty === "Custom"
                ? (scre = scre + 1)
                : props.gameDifficulty === "Medium"
                ? (scre = scre + 2)
                : (scre = scre + 3);
            }
          }
        }
        if (i + 1 <= tempArray.length - 1) {
          if (tempArray[i + 1][j - 1].isMine) {
            tempArray[i][j].value += 1;
          } else {
            if (!tempArray[i + 1][j - 1].clicked) {
              const bool = await getBool(tempArray, i + 1, j - 1);
              if (!bool && !tempArray[i + 1][j - 1].isFlag) {
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
      }

      if (j + 1 <= tempArray[i].length - 1) {
        if (i - 1 >= 0) {
          if (tempArray[i - 1][j + 1].isMine) {
            tempArray[i][j].value++;
          } else {
            if (!tempArray[i - 1][j + 1].clicked) {
              const bool = await getBool(tempArray, i - 1, j + 1);
              if (!bool && !tempArray[i - 1][j + 1].isFlag) {
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
        }
        if (tempArray[i][j + 1].isMine) {
          tempArray[i][j].value++;
        } else {
          if (!tempArray[i][j + 1].clicked) {
            const bool = await getBool(tempArray, i, j + 1);
            if (!bool && !tempArray[i][j + 1].isFlag) {
              tempArray[i][j + 1].clicked = true;
              props.gameDifficulty === "Easy" ||
              props.gameDifficulty === "Custom"
                ? (scre = scre + 1)
                : props.gameDifficulty === "Medium"
                ? (scre = scre + 2)
                : (scre = scre + 3);
            }
          }
        }
        if (i + 1 <= tempArray.length - 1) {
          if (tempArray[i + 1][j + 1].isMine) {
            tempArray[i][j].value++;
          } else {
            if (!tempArray[i + 1][j + 1].clicked) {
              const bool = await getBool(tempArray, i + 1, j + 1);
              if (!bool && !tempArray[i + 1][j + 1].isFlag) {
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
  const getBool = (tempArray, i, j) => {
    if (i - 1 >= 0) {
      if (tempArray[i - 1][j].isMine) {
        return true;
      }
    }
    if (i + 1 <= tempArray.length - 1) {
      if (tempArray[i + 1][j].isMine) {
        return true;
      }
    }
    if (j - 1 >= 0) {
      if (i - 1 >= 0) {
        if (tempArray[i - 1][j - 1].isMine) {
          return true;
        }
      }
      if (tempArray[i][j - 1].isMine) {
        return true;
      }
      if (i + 1 <= tempArray.length - 1) {
        if (tempArray[i + 1][j - 1].isMine) {
          return true;
        }
      }
    }

    if (j + 1 <= tempArray[i].length - 1) {
      if (i - 1 >= 0) {
        if (tempArray[i - 1][j + 1].isMine) {
          return true;
        }
      }
      if (tempArray[i][j + 1].isMine) {
        return true;
      }
      if (i + 1 <= tempArray.length - 1) {
        if (tempArray[i + 1][j + 1].isMine) {
          return true;
        }
      }
    }
    return false;
  };
  const rightClicked = (e, i, j) => {
    e.preventDefault();
    const tempArray = [...array];
    if (!tempArray[i][j].clicked) {
      if (flag > 0) {
        if (tempArray[i][j].isFlag) {
          tempArray[i][j].isFlag = false;
          setFlag(flag + 1);
        } else {
          tempArray[i][j].isFlag = true;
          setFlag(flag - 1);
        }

        setArray(tempArray);
      } else {
        alert("all flags used");
      }
    }
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
      rightClicked={rightClicked}
      flag={flag}
    />
  );
};

export default BoardContainer;
