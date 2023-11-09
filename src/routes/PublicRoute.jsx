import { Navigate } from "react-router-dom";

import { LS_KEY_LOGIN } from "../constants/ls-keys";

export const PublicRoute = ({
  component,
  restricted = false,
  redirectTo = "/list",
}) => {
  const isUserLoggedIn = JSON.parse(localStorage.getItem(LS_KEY_LOGIN));
  return isUserLoggedIn && restricted ? (
    <Navigate to={redirectTo} />
  ) : (
    component
  );
};
