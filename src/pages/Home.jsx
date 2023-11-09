import { useNavigate } from "react-router-dom";

import { Button, Container, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

export const Home = () => {
  const navigate = useNavigate();

  const onStartClick = () => {
    navigate("/signin");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh",
      }}>
      <Typography component="h1" variant="h5">
        You found a good place to store your notes 🤩
      </Typography>
      <Typography component="h2" variant="h6">
        Do not hesitate to join us, we already have 1 user (my mom)
      </Typography>
      <Button
        onClick={onStartClick}
        color="secondary"
        variant="contained"
        endIcon={<LoginIcon />}
        sx={{ my: 4 }}>
        Start
      </Button>
    </Container>
  );
};
