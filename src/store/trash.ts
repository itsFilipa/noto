import create from "zustand";
import { DB } from "../lib/db";
import { Note } from "./note";

interface TrashStore {
  trashNote: Note | null;
  trash: Note[] | null;
  isLoading: boolean;
  actions: {
    restoreNote: (
      noteId: string
    ) => Promise<{ note: Note | null; error: Error | null }>;
    deleteNote: (
      noteId: string
    ) => Promise<{ note: Note | null; error: Error | null }>;
    listNotes: () => Promise<{ notes: Note[] | null; error: Error | null }>;
  };
}

const useTrashStore = create<TrashStore>((set, get) => ({
  trashNote: null,
  trash: null,
  isLoading: false,
  actions: {
    restoreNote: async (noteId: string) => {
      set({ isLoading: true });
      const { data: junk } = await DB.get<Note[]>("trash", 0);
      if (!junk) {
        set({ isLoading: false });
        return { note: null, error: new Error("No notes found") };
      }
      const note = junk.find((note) => note.id === noteId);
      if (!note) {
        set({ isLoading: false });
        return { note: null, error: new Error("Note not found") };
      }
      set({ trashNote: note, isLoading: false });

      const { data: notes } = await DB.get<Note[]>("notes", 0);

      //add note to notes
      const newNotes = Array.isArray(notes) ? [...notes, note] : [note];

      //remove note from trash
      const newTrash = junk.filter((note) => note.id !== noteId);

      //update notes and trash
      await DB.set("notes", newNotes, 0);
      await DB.set("trash", newTrash);

      set({ trash: newTrash, isLoading: false });
      return { note, error: null };
    },
    deleteNote: async (noteId: string) => {
      set({ isLoading: true });
      const { data: junk } = await DB.get<Note[]>("trash", 0);
      if (!junk) {
        set({ isLoading: false });
        return { note: null, error: new Error("No notes found") };
      }
      const note = junk.find((note) => note.id === noteId);
      if (!note) {
        set({ isLoading: false });
        return { note: null, error: new Error("Note not found") };
      }
      set({ trashNote: note, isLoading: false });

      //remove note from trash
      const newTrash = junk.filter((note) => note.id !== noteId);

      //update trash
      await DB.set("trash", newTrash);

      set({ trash: newTrash, isLoading: false });
      return { note, error: null };
    },
    listNotes: async () => {
      set({ isLoading: true });
      const { data: notes, error } = await DB.get<Note[]>("trash", 0);
      set({ trash: notes, isLoading: false });
      return { notes, error };
    },
  },
}));

export const useTrash = () => {
  const trash = useTrashStore((state) => state.trash);
  const trashNote = useTrashStore((state) => state.trashNote);
  const isLoading = useTrashStore((state) => state.isLoading);
  const { restoreNote, deleteNote, listNotes } = useTrashStore(
    (state) => state.actions
  );
  return { trash, trashNote, isLoading, restoreNote, deleteNote, listNotes };
};
