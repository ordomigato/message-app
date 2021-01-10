import React from "react";
import { InputBase, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  input: {
    backgroundColor: "#E9EEF9",
    padding: "14px",
    borderRadius: "3px",
    margin: "12px 0 20px 0",
  },
  icon: {
    color: "#B1C3DF",
  },
}));

const SearchBar = ({ onChange, search }) => {
  const classes = useStyles();

  return (
    <InputBase
      id="search-user"
      label="Search"
      placeholder="Search"
      onChange={onChange}
      value={search}
      className={classes.input}
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon className={classes.icon} />
        </InputAdornment>
      }
    />
  );
};

export default SearchBar;
