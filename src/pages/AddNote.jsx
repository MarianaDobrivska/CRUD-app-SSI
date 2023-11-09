import { LS_KEY_NOTES } from "../constants/ls-keys";

import { NoteForm } from "../components/NoteForm";

export const AddNote = () => {
  const addNewNote = (title, description) => {
    const notes = JSON.parse(localStorage.getItem(LS_KEY_NOTES));
    const id = crypto.randomUUID();
    localStorage.setItem(
      LS_KEY_NOTES,
      JSON.stringify({ [id]: { title, description, id }, ...notes })
    );
  };

  return (
    <NoteForm
      buttonText="Add"
      formTitle="Create note"
      onSubmit={addNewNote}
      path="/list"
    />
  );
};
