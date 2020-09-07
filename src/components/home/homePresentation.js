import React from "react";
import "./home.css";
import {
  Container,
  Typography,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
const HomePresentation = (props) => {
  return (
    <React.Fragment>
      <Container maxWidth="sm" className={"contnr"}>
        <Typography variant="h3">Welcome!</Typography>
        <div className={"contnr"}>
          <Typography>Select Difficulty</Typography>

          <Select value={props.difficulty} onChange={props.changeDifficulty}>
            <MenuItem value="Easy">EASY</MenuItem>
            <MenuItem value="Medium">MEDIUM</MenuItem>
            <MenuItem value="Hard">HARD</MenuItem>
          </Select>
        </div>
        <div className={"contnr"}>
            <Button variant="contained" onClick={props.startGame}>PLAY</Button>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default HomePresentation;
