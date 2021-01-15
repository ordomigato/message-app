import React, { useContext } from "react";
import { Grid, Typography, IconButton } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { makeStyles } from "@material-ui/core/styles";
import UserAvatar from "components/UserAvatar";
import UserContext from "store/context/users";

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: "30px",
  },
  name: {
    paddingLeft: "17px  ",
    fontSize: "16px",
    fontWeight: 500,
    flexGrow: 1,
  },
  iconButton: {
    transform: "translateX(12px)",
  },
  icon: {
    color: theme.palette.icon.main,
    opacity: 0.5,
  },
}));

const ProfileHeader = () => {
  const classes = useStyles();
  const { user } = useContext(UserContext);

  return (
    <Grid container alignItems="center" className={classes.container}>
      <UserAvatar id={user.id} name={user.username} />
      <Typography className={classes.name}>{user.username}</Typography>
      <IconButton className={classes.iconButton}>
        <MoreHorizIcon className={classes.icon} />
      </IconButton>
    </Grid>
  );
};

export default ProfileHeader;
