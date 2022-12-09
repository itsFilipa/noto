import { useEffect } from "react";
import create, { useStore } from "zustand";
import { useUserNotes, useUserNotesStore } from ".";
import { DB } from "../lib/db";
import { Note } from "./note";

interface TrashStore {
  trashNote: Note | null;
  trash: Note[] | null;
  isLoading: boolean;
  actions: {
    setLoading: (isLoading: boolean) => void;
    setTrash: (notes: Note[]) => void;
    restoreNote: (
      noteId: string
    ) => Promise<{ note: Note | null; error: Error | null }>;
    deleteNote: (
      noteId: string
    ) => Promise<{ note: Note | null; error: Error | null }>;
  };
}

const useTrashStore = create<TrashStore>((set, get) => ({
  trashNote: null,
  trash: null,
  isLoading: false,
  actions: {
    setLoading: (isLoading: boolean) => {
      set({ isLoading });
    },
    setTrash: (notes: Note[]) => {
      set({ trash: notes });
    },
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

      const { data: notes } = await DB.get<Note[]>("usernotes", 0);

      //add note to notes
      const newNotes = Array.isArray(notes) ? [...notes, note] : [note];

      //remove note from trash
      const newTrash = junk.filter((note) => note.id !== noteId);

      //update notes and trash
      await DB.set("usernotes", newNotes, 0);
      await DB.set("trash", newTrash);

      //set the state for the usernotes store
      const usernotes = useUserNotesStore.getState().notes;
      console.log(usernotes);
      console.log(note);
      const newUserNotes = Array.isArray(usernotes)
        ? [...usernotes, note]
        : [note];

      useUserNotesStore.getState().actions.setNotes(newUserNotes);

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
  },
}));

const fetchTrash = async () => {
  const { data: notes, error } = await DB.get<Note[]>("trash", 0);
  if (error || !notes) {
    return [];
  }
  return notes;
};

export const useTrash = () => {
  const trash = useTrashStore((state) => state.trash);
  const trashNote = useTrashStore((state) => state.trashNote);
  const isLoading = useTrashStore((state) => state.isLoading);
  const { setLoading, setTrash, restoreNote, deleteNote } =
    useTrashStore((state) => state.actions);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchTrash()
      .then((notes) => {
        if (isMounted) {
          setTrash(notes);
          setLoading(false);
        }
      })
      .finally(() => {
        setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [setLoading, setTrash]);

  return { trash, trashNote, isLoading, restoreNote, deleteNote };
};
