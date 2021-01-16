import React, { useContext, useState, useEffect } from "react";
import { Grid, Typography, IconButton } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { makeStyles } from "@material-ui/core/styles";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import UserContext from "store/context/users";
import ConversationContext from "store/context/conversations";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "30px 40px 30px 25px",
    boxShadow: "0px 2px 20px 0px rgba(88, 142, 196, 0.1)",
  },
  name: {
    fontWeight: 500,
    fontSize: 20,
  },
  status: {
    display: "flex",
    marginLeft: "15px",
    alignItems: "center",
    color: "#BFC9DB",
    fontWeight: 500,
    flexGrow: 1,
  },
  statusIcon: {
    fontSize: 10,
    color: theme.palette.online.main,
  },
  moreButton: {
    // flush button icon with chat section
    transform: "translateX(24px)",
  },
  moreIcon: {
    color: theme.palette.icon.main,
    opacity: 0.5,
    fontSize: "1.5rem",
  },
}));

const ChatHeader = () => {
  const classes = useStyles();
  const [isOnline, setIsOnline] = useState(false);

  const { user, onlineUsers } = useContext(UserContext);
  const { openedConversation } = useContext(ConversationContext);

  useEffect(() => {
    const participantIds = openedConversation.participants
      .filter((p) => p.id !== user.id)
      .map((p) => p.id);
    setIsOnline(participantIds.some((id) => onlineUsers.includes(id)));
  }, [onlineUsers, openedConversation]);

  return (
    <Grid container className={classes.container} alignItems="center">
      <Grid item>
        <Typography className={classes.name}>
          {openedConversation.participants.map((participant) => (
            <span key={participant.id}>
              {participant.id === user.id ? null : participant.username + " "}
            </span>
          ))}
        </Typography>
      </Grid>

      <Grid item className={classes.status}>
        {isOnline && (
          <Typography>
            <FiberManualRecordIcon className={classes.statusIcon} /> Online
          </Typography>
        )}
      </Grid>
      <Grid item>
        <IconButton className={classes.moreButton}>
          <MoreHorizIcon className={classes.moreIcon} />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default ChatHeader;
