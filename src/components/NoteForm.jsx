import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Alert,
  Box,
  Button,
  Container,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

export const NoteForm = ({
  formTitle,
  buttonText,
  onSubmit,
  path,
  defaultValues,
}) => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = data.get("title").trim();
    const description = data.get("description").trim();

    if (!title || !description) {
      setError(true);
    } else {
      onSubmit(title, description);
      event.target.reset();
    }
  };

  const goBack = () => navigate(path);

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        mt: 10,
      }}>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Typography
          component="h1"
          variant="h5"
          sx={{ textAlign: "center", mb: 3 }}>
          {formTitle}
        </Typography>
        <TextField
          id="title"
          name="title"
          label="Note Title"
          required
          inputProps={{ maxLength: 50 }}
          fullWidth
          multiline
          defaultValue={defaultValues?.title}
        />
        <TextField
          id="description"
          name="description"
          label="Note Description"
          inputProps={{ maxLength: 300 }}
          multiline
          required
          fullWidth
          rows={5}
          sx={{ mt: 2, mb: 4 }}
          defaultValue={defaultValues?.description}
        />
        <Button
          type="button"
          variant="text"
          sx={{ mr: 2, width: "100px" }}
          onClick={goBack}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" sx={{ width: "100px" }}>
          {buttonText}
        </Button>
      </Box>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={() => setError(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ top: "80px !important" }}>
        <Alert severity="info">Please fill out all fields</Alert>
      </Snackbar>
    </Container>
  );
};
