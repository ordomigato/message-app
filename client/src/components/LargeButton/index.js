import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    width: "140px",
    height: "54px",
    textTransform: "capitalize",
    boxShadow: "0px 2px 12px 0px rgba(74, 106, 149, 0.2)",
  },
}));

const LargeButton = (props) => {
  const classes = useStyles();

  return (
    <Button className={classes.button} {...props}>
      {props.children}
    </Button>
  );
};

export default LargeButton;
