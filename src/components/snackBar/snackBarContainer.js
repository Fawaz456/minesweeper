import React, { useState, useEffect } from "react";
import SnackBarPresentation from "./snackBarPresentation";
const SnackBarContainer = (props) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(props.open);
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
