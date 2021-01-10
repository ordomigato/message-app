import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Badge } from "@material-ui/core";

const StyledBadge = withStyles(theme => ({
  badge: {
    backgroundColor: theme.palette.online.main,
    color: theme.palette.online.main,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      content: '""',
    },
  },
}))(Badge);

const OnlineBadge = props => {
  return (
    <StyledBadge
      overlap="circle"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      variant="dot"
    >
      {props.children}
    </StyledBadge>
  );
};

export default OnlineBadge;
