import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import "./snackBar.css";

const SnackBarPresentation = (props) => {
  return (
    <Snackbar
      open={props.open}
      autoHideDuration={3000}
      onClose={() => props.handleCloseAlert()}
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
    >
      <Alert
        className="fullWidth"
        onClose={() => props.handleCloseAlert()}
        severity={"error"}
      >
        {props.msg}
      </Alert>
    </Snackbar>
  );
};

export default SnackBarPresentation;
