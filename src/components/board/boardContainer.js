import React, { useState, useEffect } from "react";
import BoardPresentation from "./boardPresentation";
const BoardContainer = (props) => {
  const [array, setArray] = useState(null); //array state to display the grid of the gameboard
  const [mineStepped, setMineStepped] = useState(false); //state to display alert/dialog if game is won or lost
  const [gameRestart, setGameRestart] = useState(false); //state to restart game if any grid of board is clicked
  const [won, setWon] = useState(false); //state to display win message if game is won
  const [score, setScore] = useState(null); //state to maintain score of the game
  const [flag, setFlag] = useState(null); //state to mainatain total flags that can be used in a game
  const [snackOpen, setSnackOpen] = useState(false); //state to display alert if user wants to use flag more than available
  //compnentDidMount and componentDidUpdate(for gameRestart state)
  useEffect(() => {
    setScore(0); //initialize the score to zero
    let tempArray; //declare temporary array
    //if user did not choose game difficulty as custom
    if (props.gameDifficulty !== "Custom") {
      //fill the temporary array as 2d-array of 10x10 with each element to be
      //object({ clicked: false, value: 0, isMine: false, isFlag: false })
      tempArray = Array.from({ length: 10 }, () =>
        Array.from({ length: 10 }, () => {
          return { clicked: false, value: 0, isMine: false, isFlag: false };
        })
      );
    } else {
      //fill the temporary array as 2d-array of user input rows and columns with each element to be
      //object({ clicked: false, value: 0, isMine: false, isFlag: false })
      tempArray = Array.from({ length: props.rows }, () =>
        Array.from({ length: props.columns }, () => {
          return { clicked: false, value: 0, isMine: false };
        })
      );
    }
    //declare the variable x and assign it the value of mines based on difficulty
    //if user choosed custom difficulty assign it the mines value entered by user
    //else if difficulty easy x=10,medium x=15,hard x=20 which is mines
    let x;
    props.gameDifficulty === "Easy"
      ? (x = 10)
      : props.gameDifficulty === "Medium"
      ? (x = 15)
      : props.gameDifficulty === "Hard"
      ? (x = 20)
      : (x = props.mines);
    setFlag(x); //set the flag value as of total mines
    //loop to randomly place the mines across the board
    while (x > 0) {
      let i, j;
      i = Math.floor(Math.random() * tempArray.length + 1) - 1; //get random row value
      j = Math.floor(Math.random() * tempArray[0].length + 1) - 1; //get random column value
      //place the mine by random values if mine is not placed in it
      if (!tempArray[i][j].isMine) {
        tempArray[i][j].isMine = true;
        --x;
      }
    }
    setArray(tempArray); //set the array state as temporary array
  }, [gameRestart]);
  //function to restart the game in between the game and if game is win/lost
  const restartGame = () => {
    setGameRestart(!gameRestart); //restarts the game
    setMineStepped(false); //hides the win/lost modal/dialog on restarting
  };
  //function to manipulate the grid values/open the grid(left click)
  const clicked = async (i, j) => {
    /*
    spread and assign the grid array value to temporary array.

    if particular grid box is already clicked or has flag then return from the function.

    else if clicked grid box has mine then end the game by displaying dialog with score and display all the box that has mine.

    else open the grid box along with display the value of the grid box by checking adjacent grid boxes,
    increment score based on difficulty and open adjacent boxes if their value of adjacent boxes is 0 
    or doesnot have flag or does not have mine.

     */
    const tempArray = [...array];
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
      let scre = score;
      tempArray[i][j].clicked = true;
      props.gameDifficulty === "Easy" || props.gameDifficulty === "Custom"
        ? (scre = scre + 1)
        : props.gameDifficulty === "Medium"
        ? (scre = scre + 2)
        : (scre = scre + 3);
      //check for grid in upper row,same column
      if (i - 1 >= 0) {
        if (tempArray[i - 1][j].isMine) {
          tempArray[i][j].value += 1;
        } else {
          if (!tempArray[i - 1][j].clicked) {
            //check whether the adjacent box has value greater than zero or has mine.
            const bool = await getBool(tempArray, i - 1, j);
            //check whether the adjacent box has value greater than zero or has mine and doesn't have flag.
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
      //check for grid in lower row,same column
      if (i + 1 <= tempArray.length - 1) {
        if (tempArray[i + 1][j].isMine) {
          tempArray[i][j].value += 1;
        } else {
          if (!tempArray[i + 1][j].clicked) {
            //check whether the adjacent box has value greater than zero or has mine.
            const bool = await getBool(tempArray, i + 1, j);
            //check whether the adjacent box has value greater than zero or has mine and doesn't have flag.
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
      //check for left column and upper row,lower row,same row
      if (j - 1 >= 0) {
        if (i - 1 >= 0) {
          if (tempArray[i - 1][j - 1].isMine) {
            tempArray[i][j].value += 1;
          } else {
            if (!tempArray[i - 1][j - 1].clicked) {
              //check whether the adjacent box has value greater than zero or has mine.
              const bool = await getBool(tempArray, i - 1, j - 1);
              //check whether the adjacent box has value greater than zero or has mine and doesn't have flag.
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
            //check whether the adjacent box has value greater than zero or has mine.
            const bool = await getBool(tempArray, i, j - 1);
            //check whether the adjacent box has value greater than zero or has mine and doesn't have flag.
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
              //check whether the adjacent box has value greater than zero or has mine.
              const bool = await getBool(tempArray, i + 1, j - 1);
              //check whether the adjacent box has value greater than zero or has mine and doesn't have flag.
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
      //check for right column and upper row,lower row,same row
      if (j + 1 <= tempArray[i].length - 1) {
        if (i - 1 >= 0) {
          if (tempArray[i - 1][j + 1].isMine) {
            tempArray[i][j].value++;
          } else {
            if (!tempArray[i - 1][j + 1].clicked) {
              //check whether the adjacent box has value greater than zero or has mine.
              const bool = await getBool(tempArray, i - 1, j + 1);
              //check whether the adjacent box has value greater than zero or has mine and doesn't have flag.
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
            //check whether the adjacent box has value greater than zero or has mine.
            const bool = await getBool(tempArray, i, j + 1);
            //check whether the adjacent box has value greater than zero or has mine and doesn't have flag.
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
              //check whether the adjacent box has value greater than zero or has mine.
              const bool = await getBool(tempArray, i + 1, j + 1);
              //check whether the adjacent box has value greater than zero or has mine and doesn't have flag.
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
      //check if all grid box without mines are opened
      if (
        (props.gameDifficulty === "Easy" && scre === 90) ||
        (props.gameDifficulty === "Medium" && scre === 170) ||
        (props.gameDifficulty === "Hard" && scre === 240) ||
        (props.gameDifficulty === "Custom" &&
          scre === props.rows * props.columns - props.mines)
      ) {
        //Declare the game to be won by user
        setWon(true);
        setMineStepped(true);
      }
    }
    setArray(tempArray);
  };
  //function to check whether the adjacent box's adjacent box has value greater than zero or has mine.
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
  //function to place/remove the flag from the grid box(right click).
  const rightClicked = (e, i, j) => {
    e.preventDefault();
    const tempArray = [...array];
    if (!tempArray[i][j].clicked) {
      if (tempArray[i][j].isFlag) {
        tempArray[i][j].isFlag = false;
        setFlag(flag + 1);
      } else {
        if (flag > 0) {
          tempArray[i][j].isFlag = true;
          setFlag(flag - 1);
        } else {
          setSnackOpen(true);
        }
      }

      setArray(tempArray);
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
      snackOpen={snackOpen}
      handleCloseAlert={() => setSnackOpen(false)}
    />
  );
};

export default BoardContainer;
