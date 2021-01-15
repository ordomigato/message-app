import React, { useContext } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import UserAvatar from "components/UserAvatar";
import { makeStyles } from "@material-ui/core/styles";
import ConversationContext from "store/context/conversations";

const useStyles = makeStyles(() => ({
  container: {
    padding: "18px 34px 18px 17px",
    position: "relative",
  },
  userInfo: {
    flex: 1,
    marginLeft: "20px",
  },
  name: {
    fontSize: "14px",
  },
  message: {
    fontSize: "12px",
    paddingRight: "auto",
  },
}));

const UserCard = ({ user }) => {
  const classes = useStyles();

  const { createConversation } = useContext(ConversationContext);

  const onClick = () => {
    createConversation([user.id]);
  };

  return (
    <Grid container className={classes.container} alignItems="center">
      <Grid item>
        <UserAvatar
          image={user.profileImage ? user.profileImage : null}
          id={user.id}
        />
      </Grid>
      <Grid item className={classes.userInfo}>
        <Typography className={classes.name}>{user.username}</Typography>
      </Grid>
      <Button onClick={onClick}>Chat</Button>
    </Grid>
  );
};

export default UserCard;
