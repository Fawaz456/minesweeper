import React from "react";
import "./home.css";
import {
  Container,
  Typography,
  Select,
  MenuItem,
  Button,
  TextField,
} from "@material-ui/core";
import Snackbar from "../snackBar/snackBar";
const HomePresentation = (props) => {
  return (
    <React.Fragment>
      <Container maxWidth="sm" className={"contnr"}>
        <Snackbar
          open={props.snackOpen}
          msg={"Input incorrect...Please refer note below!"}
          handleCloseAlert={props.handleCloseAlert}
        />
        <Typography variant="h3">Welcome!</Typography>
        <div className={"contnr"}>
          <Typography>Select Difficulty</Typography>
          <Select value={props.difficulty} onChange={props.changeDifficulty}>
            <MenuItem value="Easy">EASY</MenuItem>
            <MenuItem value="Medium">MEDIUM</MenuItem>
            <MenuItem value="Hard">HARD</MenuItem>
            <MenuItem value="Custom">CUSTOM</MenuItem>
          </Select>
        </div>
        {props.customInput ? (
          <div className={"contnr"}>
            <TextField
              type={"number"}
              onChange={props.setRows}
              value={props.rows}
              className={"textstyle"}
              label="Rows"
              variant="outlined"
            />
            <br />
            <TextField
              type={"number"}
              onChange={props.setColumns}
              value={props.columns}
              className={"textstyle"}
              label="Columns"
              variant="outlined"
            />

            <br />
            <TextField
              type={"number"}
              onChange={props.setMines}
              value={props.mines}
              className={"textstyle"}
              label="Mines"
              variant="outlined"
            />
            <br />
            <Typography variant="caption" className={"textstyle"}>
              *Minimum number for rows and columns is 5.
            </Typography>
            <br />
            <Typography variant="caption" className={"textstyle"}>
              *Mines to be less than rows * columns and greater than 4.
            </Typography>
          </div>
        ) : null}
        <div className={"contnr"}>
          <Button variant="contained" onClick={props.startGame}>
            PLAY
          </Button>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default HomePresentation;
