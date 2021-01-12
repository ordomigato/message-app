import React, { useContext, useState } from "react";
import ChatUserCard from "./ChatUserCard";
import SearchBar from "./SearchBar";
import { Grid, Typography } from "@material-ui/core";
import ConversationContext from "store/context/conversations";

const ChatList = () => {
  const { conversations } = useContext(ConversationContext);
  const [search, setSearch] = useState("");

  const onChange = e => {
    setSearch(e.target.value);
  };

  return (
    <Grid container direction="column">
      <Typography variant="h2">Chats</Typography>
      <SearchBar onChange={onChange} search={search} />
      {conversations
        .filter(conversation =>
          search === ""
            ? conversation
            : conversation.participants.some(p =>
                p.name.toLowerCase().includes(search.toLowerCase())
              )
        )
        .map(conversation => (
          <ChatUserCard conversation={conversation} key={conversation.id} />
        ))}
    </Grid>
  );
};

export default ChatList;
