import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { LS_KEY_NOTES } from "../constants/ls-keys";

import { NoteForm } from "../components/NoteForm";

export const EditNote = () => {
  const [notes, setNotes] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem(LS_KEY_NOTES));
    setNotes(notes);
  }, []);

  const handleEdit = (title, description) => {
    const currentNote = notes[id];
    if (
      currentNote.title === title &&
      currentNote.description === description
    ) {
      navigate("/list");
      return;
    }

    const updatedNotes = {
      ...notes,
      [id]: { ...currentNote, title, description },
    };

    setNotes(updatedNotes);
    localStorage.setItem(LS_KEY_NOTES, JSON.stringify(updatedNotes));
    navigate("/list");
  };

  return (
    <>
      <NoteForm
        buttonText="Edit"
        formTitle="Edit note"
        onSubmit={handleEdit}
        path="/list"
        defaultValues={notes[id]}
      />
    </>
  );
};
