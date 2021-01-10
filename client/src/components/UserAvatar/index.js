import React from "react";
import { Avatar } from "@material-ui/core";
import OnlineBadge from "../Badges/Online";

const UserAvatar = ({ image, status, name }) => {
  return (
    <OnlineBadge>
      <Avatar alt={`${name}`} src={image ? image : null} />
    </OnlineBadge>
  );
};

export default UserAvatar;
