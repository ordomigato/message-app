import React from "react";
import { Avatar } from "@material-ui/core";
import OnlineBadge from "components/Badges/Online";

// TODO use status to change which badge is showing (online || offline)
const UserAvatar = ({ image, status, name }) => {
  return (
    <OnlineBadge>
      <Avatar alt={`${name}`} src={image ? image : null} />
    </OnlineBadge>
  );
};

export default UserAvatar;
