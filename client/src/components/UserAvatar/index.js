import React, { useContext, useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import OnlineBadge from "components/Badges/Online";
import UserContext from "store/context/users";

// TODO use status to change which badge is showing (online || offline)
const UserAvatar = ({ image, name, id }) => {
  const { onlineUsers } = useContext(UserContext);
  const [online, setOnline] = useState(false);

  useEffect(() => {
    if (!onlineUsers) return;
    const isOnline = onlineUsers.includes(id);
    setOnline(isOnline);
  }, [onlineUsers, id]);

  return (
    <>
      {online === true ? (
        <OnlineBadge>
          <Avatar alt={`${name}`} src={image ? image : null} />
        </OnlineBadge>
      ) : (
        <>
          <Avatar alt={`${name}`} src={image ? image : null} />
        </>
      )}
    </>
  );
};

export default UserAvatar;
