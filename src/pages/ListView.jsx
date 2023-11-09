import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Avatar,
  Box,
  Button,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import EditIcon from "@mui/icons-material/Edit";
import PostAddIcon from "@mui/icons-material/PostAdd";

import { LS_KEY_NOTES } from "../constants/ls-keys";

export const ListView = () => {
  const [notes, setNotes] = useState({});
  const navigate = useNavigate();
  const notesList = Object.values(notes);

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem(LS_KEY_NOTES));
    setNotes(notes);
  }, []);

  const onCreateClick = () => {
    navigate("/add");
  };

  const onEditClick = (id) => {
    navigate(`/edit/${id}`);
  };

  const onDeleteClick = (noteId) => {
    const updatedNotes = { ...notes };
    delete updatedNotes[noteId];
    setNotes(updatedNotes);
    localStorage.setItem(LS_KEY_NOTES, JSON.stringify(updatedNotes));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Button
        onClick={onCreateClick}
        color="secondary"
        variant="contained"
        endIcon={<PostAddIcon />}
        sx={{ my: 4, ml: 2 }}>
        Create new note
      </Button>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 2 }}>
        {notesList.length > 0
          ? "NOTES"
          : "Your future notes will appear here. Create your first one by clicking button above :)"}
      </Typography>
      <Grid item xs={12} md={6} sx={{ width: "100%", maxWidth: "800px" }}>
        <List>
          {notesList.map(({ id, title, description }) => (
            <ListItem
              key={id}
              id={id}
              secondaryAction={
                <>
                  <IconButton
                    edge="start"
                    aria-label="delete"
                    onClick={() => onDeleteClick(id)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => onEditClick(id)}>
                    <EditIcon />
                  </IconButton>
                </>
              }>
              <ListItemAvatar>
                <Avatar>
                  <StickyNote2Icon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={title}
                secondary={description}
                sx={{ maxWidth: "600px" }}
              />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Box>
  );
};
