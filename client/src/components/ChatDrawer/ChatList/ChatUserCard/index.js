import React, { useContext } from "react";
import { Grid, Typography, Badge } from "@material-ui/core";
import UserAvatar from "components/UserAvatar";
import { makeStyles } from "@material-ui/core/styles";
import ConversationContext from "store/context/conversations";
import UserContext from "store/context/users";

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
  const { getConversation } = useContext(ConversationContext);
  const { user } = useContext(UserContext);
  const classes = useStyles();

  const onClick = (e) => {
    getConversation(conversation.id);
  };

  return (
    <Grid
      container
      className={classes.container}
      alignItems="center"
      onClick={onClick}
    >
      <Grid item>
        <UserAvatar
          image={
            // find first participant that isn't you
            conversation.participants.find((p) => p.id !== user.id).profileImage
          }
          id={conversation.participants.find((p) => p.id !== user.id).id}
        />
      </Grid>
      <Grid item className={classes.userInfo}>
        <Typography className={classes.name}>
          {conversation.participants.map((p, i) => (
            <span key={p.id}>
              {p.id === user.id ? null : p.username}
              {i === conversation.participants.length - 2 ? "" : " "}
            </span>
          ))}
        </Typography>

        <Typography className={classes.message}>
          {conversation.messages[0]
            ? conversation.messages[conversation.messages.length - 1].message
            : "Start conversation..."}
        </Typography>
      </Grid>
      <Grid item>
        {/* TODO update based on tracker */}
        <Badge badgeContent={0} showZero={false} color="primary" />
      </Grid>
    </Grid>
  );
};

export default ChatUserCard;
