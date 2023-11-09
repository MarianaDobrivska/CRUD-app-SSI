import { Navigate } from "react-router-dom";

import { LS_KEY_LOGIN } from "../constants/ls-keys";

export const PrivateRoute = ({ component, redirectTo = "/signin" }) => {
  const isUserLoggedIn = JSON.parse(localStorage.getItem(LS_KEY_LOGIN));

  return isUserLoggedIn ? component : <Navigate to={redirectTo} />;
};
