import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Alert, Snackbar } from "@mui/material";

import {
  validateEmail,
  validatePassword,
} from "../helpers/auth-form-validation";
import { LS_KEY_LOGIN, LS_KEY_USER } from "../constants/ls-keys";

export default function Auth() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    email: { status: false, text: "" },
    password: { status: false, text: "" },
    user: { status: false, text: "" },
  });
  const isSignupPage = pathname === "/signup";

  const handleSignIn = ({ email, password }, resetForm) => {
    const user = JSON.parse(localStorage.getItem(LS_KEY_USER));
    if (!user) {
      setErrors((prevState) => ({
        ...prevState,
        user: { status: true, text: "User does not exist. Please Sign Up" },
      }));
      return;
    }

    if (user.email === email && user.password === password) {
      resetForm();
      navigate("/list");
      localStorage.setItem(LS_KEY_LOGIN, JSON.stringify(true));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        user: {
          status: true,
          text: "Incorrect credentials. Please try again",
        },
      }));
    }
  };

  const handleSignUp = (user, resetForm) => {
    const emailValidation = validateEmail(user.email);
    const passwordValidation = emailValidation.status
      ? { status: false, text: "" }
      : validatePassword(user.password);

    if (emailValidation.status || passwordValidation.status) {
      setErrors((prevState) => ({
        ...prevState,
        email: emailValidation,
        password: passwordValidation,
      }));
    } else {
      localStorage.setItem(LS_KEY_USER, JSON.stringify(user));
      localStorage.setItem(LS_KEY_LOGIN, JSON.stringify(true));
      resetForm();
      navigate("/list");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const resetForm = () => event.target.reset();

    const data = new FormData(event.currentTarget);
    const email = data.get("email").trim();
    const password = data.get("password").trim();

    if (isSignupPage) {
      handleSignUp({ email, password }, resetForm);
    } else {
      handleSignIn({ email, password }, resetForm);
    }
  };

  const switchToSignUp = () => {
    isSignupPage ? navigate("/signin") : navigate("/signup");
  };

  const handleCloseErrorNotification = () =>
    setErrors((prevState) => ({
      ...prevState,
      user: { status: false, text: "" },
    }));

  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 12,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {isSignupPage ? "Sign up" : "Sign in"}
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                error={errors.email.status}
                helperText={errors.email.text}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={errors.password.status}
                helperText={errors.password.text}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>
                {isSignupPage ? "Sign up" : "Sign in"}
              </Button>
              <Grid container>
                <Link href="#" variant="body2" onClick={switchToSignUp}>
                  {isSignupPage
                    ? "Already have an account? Sign in"
                    : "Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        open={errors.user.status}
        autoHideDuration={6000}
        onClose={handleCloseErrorNotification}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert severity="error">{errors.user.text}</Alert>
      </Snackbar>
    </>
  );
}
