import React, { useContext, useEffect } from "react";
import ChatUserCard from "./ChatUserCard";
import UserCard from "./UserCard";
import SearchBar from "./SearchBar";
import { Grid, Typography } from "@material-ui/core";
import ConversationContext from "store/context/conversations";
import UserContext from "store/context/users";

const ChatList = () => {
  const { conversations, getConversations } = useContext(ConversationContext);

  const { user: currentUser, users } = useContext(UserContext);

  useEffect(() => {
    getConversations();
  }, [getConversations, currentUser]);

  return (
    <Grid container direction="column">
      <Typography variant="h2">Chats</Typography>
      <SearchBar />
      {conversations.map((c) =>
        !c ? null : <ChatUserCard conversation={c} key={c.convoIdentifier} />
      )}
      {users.map((u) => {
        // remove current logged in user from results
        if (u.id === currentUser.id) return null;
        return <UserCard user={u} key={u.id} />;
      })}
    </Grid>
  );
};

export default ChatList;
