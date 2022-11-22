import { Note } from "./note";

interface TrashStore {
  notes: Note[];
  isLoading: boolean;
  error: string;
  actions: {
    restoreNote: (noteId: string) => void;
    deleteNote: (noteId: string) => void;
    listNotes: () => Note[];
  };
};