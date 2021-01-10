import React, { useContext } from "react";
import { Grid, Typography, Badge } from "@material-ui/core";
import UserAvatar from "../../../UserAvatar";
import { makeStyles } from "@material-ui/core/styles";
import ConversationContext from "../../../../store/context/conversations";

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

const ChatUserCard = ({ conversation }) => {
  const { changeConversation } = useContext(ConversationContext);
  const classes = useStyles();

  const onClick = e => {
    changeConversation(conversation.id);
  };

  return (
    <Grid
      container
      className={classes.container}
      alignItems="center"
      onClick={onClick}
    >
      <Grid item>
        <UserAvatar image={conversation.participants[0].image} />
      </Grid>
      <Grid item className={classes.userInfo}>
        {conversation.participants.map(p => (
          <Typography className={classes.name} key={p.id}>
            {p.name}
          </Typography>
        ))}
        <Typography className={classes.message}>
          {conversation.messages[0].message}
        </Typography>
      </Grid>
      <Grid item>
        <Badge badgeContent={3} showZero={false} color="primary" />
      </Grid>
    </Grid>
  );
};

export default ChatUserCard;
