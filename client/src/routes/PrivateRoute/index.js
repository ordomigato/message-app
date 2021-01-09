import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../../store/context/users";

const PrivateRoute = ({ children, ...rest }) => {
  const { isAuthenticated } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={() => {
        return isAuthenticated === true ? children : <Redirect to="/signup" />;
      }}
    />
  );
};

export default PrivateRoute;
