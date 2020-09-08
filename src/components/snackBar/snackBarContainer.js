import React, { useState, useEffect } from "react";
import SnackBarPresentation from "./snackBarPresentation";
const SnackBarContainer = (props) => {
  const [open, setOpen] = useState(false); //state to display the alert
  useEffect(() => {
    setOpen(props.open); //To display alert
  });
  return (
    <SnackBarPresentation
      open={open}
      msg={props.msg}
      handleCloseAlert={() => props.handleCloseAlert()}
    />
  );
};

export default SnackBarContainer;
