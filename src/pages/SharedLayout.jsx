import { Outlet, useNavigate } from "react-router-dom";

import { AppBar, Button, Toolbar, Typography } from "@mui/material";

import { LS_KEY_LOGIN } from "../constants/ls-keys";

export const SharedLayout = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.setItem(LS_KEY_LOGIN, JSON.stringify(false));
    navigate("/signin");
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Your notes
          </Typography>
          <Button color="inherit" onClick={handleLogOut}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};
