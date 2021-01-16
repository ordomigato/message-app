import React, { useEffect, useContext } from "react";
import ChatDrawer from "components/ChatDrawer";
import ChatContainer from "components/ChatContainer";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UserContext from "store/context/users";
import { SocketContext } from "socket";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    padding: 0,
  },
}));

const MessagePage = () => {
  const classes = useStyles();
  const { user, setOnlineUsers } = useContext(UserContext);
  const { socket, isConnected, connectSocket } = useContext(SocketContext);

  useEffect(() => {
    if (user) {
      if (!isConnected) {
        connectSocket(true);
      }
      if (socket !== null) {
        socket.emit("user-online", user);
        socket.on("user-online", (onlineUsers) => {
          setOnlineUsers(onlineUsers);
        });
      }
    }
  }, [user, socket, connectSocket, isConnected, setOnlineUsers]);

  return (
    <Container component="main" maxWidth={false} className={classes.root}>
      <Grid container direction="row">
        <Grid item sm={6} md={4} xs={12}>
          <ChatDrawer />
        </Grid>
        <Grid item sm={6} md={8} xs={12}>
          <ChatContainer />
        </Grid>
      </Grid>
    </Container>
  );
};

export default MessagePage;
