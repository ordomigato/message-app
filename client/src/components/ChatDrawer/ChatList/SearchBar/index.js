import React, { useState, useEffect, useContext } from "react";
import { InputBase, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import UserContext from "store/context/users";

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

const SearchBar = () => {
  const classes = useStyles();
  const [query, setQuery] = useState("");
  const { findUsers } = useContext(UserContext);

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    // wait until user stops typing
    const timeoutId = setTimeout(() => findUsers(query), 1000);
    return () => clearTimeout(timeoutId);
  }, [query, findUsers]);

  return (
    <InputBase
      id="search-user"
      label="Search"
      placeholder="Search"
      onChange={onChange}
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
