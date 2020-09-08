import React from "react";
import "./board.css";
import { Typography, Dialog, Button, Container } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import ReplayIcon from "@material-ui/icons/Replay";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Snackbar from "../snackBar/snackBar";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import FlagIcon from "@material-ui/icons/Flag";
const BoardPresentation = (props) => {
  const body = (
    <div className={"simpleDialog"}>
      {props.won ? (
        <Typography>
          You Won{" "}
          <FitnessCenterIcon
            style={{ color: "green", verticalAlign: "bottom" }}
          />
        </Typography>
      ) : (
        <Typography>
          GAME OVER
          <HighlightOffIcon style={{ color: "red", verticalAlign: "bottom" }} />
        </Typography>
      )}
      <Typography>Difficulty:{props.gameDifficulty}</Typography>
      <Typography>Score:{props.score}</Typography>
      <Button variant="outlined" onClick={props.backHome} className={"btn"}>
        <HomeIcon />
      </Button>
      <Button variant="outlined" onClick={props.restart} className={"btn"}>
        <ReplayIcon />
      </Button>
    </div>
  );
  return (
    <React.Fragment>
      <Dialog open={props.mineStepped}>{body}</Dialog>
      <Container className={"board"}>
        <Snackbar
          open={props.snackOpen}
          msg={"All flags used!"}
          handleCloseAlert={props.handleCloseAlert}
        />
        <div>
          <Typography variant="h5">Minesweeper</Typography>
          <Typography>Difficulty:{props.gameDifficulty}</Typography>
          <Typography>Flags:{props.flag}</Typography>

          <Typography>Score : {props.score}</Typography>
        </div>
        {props.array?.map((item, index) => {
          return (
            <div key={index} className={"flex-container"}>
              {item.map((i, id) => {
                return (
                  <div
                    key={id}
                    className={!i.clicked ? "notClicked" : "value"}
                    onClick={() => props.clicked(index, id)}
                    onContextMenu={(e) => props.rightClicked(e, index, id)}
                  >
                    {i.isFlag && i.clicked && i.isMine ? (
                      <FlagIcon className={"mine"} />
                    ) : i.isFlag ? (
                      <FlagIcon />
                    ) : i.clicked ? (
                      i.isMine ? (
                        <FiberManualRecordIcon className={"mine"} />
                      ) : i.value > 0 ? (
                        i.value
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
        <Button variant="outlined" onClick={props.backHome} className={"btn"}>
          <HomeIcon />
        </Button>
        {props.score > 0 ? (
          <Button variant="outlined" onClick={props.restart} className={"btn"}>
            <ReplayIcon />
          </Button>
        ) : null}
        <br />
        <Typography variant="caption" className={"textstyle"}>
          *Flags can be placed and removed by right clicking
        </Typography>
      </Container>
    </React.Fragment>
  );
};

export default BoardPresentation;
