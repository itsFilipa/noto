import { faker } from "@faker-js/faker";
import { useEffect } from "react";
import create from "zustand";
import { Note, User } from ".";
import { DB } from "../lib/db";

interface UserNoteStore {
  note: Note | null;
  notes: Note[] | null;
  isLoading: boolean;
  actions: {
    setLoading: (isLoading: boolean) => void;
    setNotes: (notes: Note[]) => void;
    createNote: () => Promise<{ note: Note | null; error: Error | null }>;
    getNote: (
      noteId: string
    ) => Promise<{ note: Note | null; error: Error | null }>;
    updateNote: (
      payload: Partial<Note>
    ) => Promise<{ note: Note | null; error: Error | null }>;
    moveToTrash: (
      noteId: string
    ) => Promise<{ note: Note | null; error: Error | null }>;
    forkNote: (
      noteId: string
    ) => Promise<{ note: Note | null; error: Error | null }>;
    
  };
}

const useUserNotesStore = create<UserNoteStore>((set, get) => ({
  note: null,
  notes: null,
  isLoading: false,
  actions: {
    setLoading: (isLoading: boolean) => set({ isLoading }),
    setNotes: (notes: Note[]) => set({ notes }),
    createNote: async () => {
      set({ isLoading: true });

      const { data: user, error: userError } = await DB.get<User>(
        "currentUser",
        0
      );
      if (userError || !user) {
        set({ isLoading: false });
        return { note: null, error: new Error("Something went wrong.") };
      }

      const { data: notes, error: notesError } = await DB.get<Note[]>(
        "usernotes",
        0
      );
      if (notesError) {
        set({ isLoading: false });
        return { note: null, error: new Error("Something went wrong.") };
      }

      const date = new Date().toISOString();

      const newNote = {
        id: faker.datatype.uuid(),
        title: "Untitled",
        content: "",
        tags: [],
        likes: [],
        forks: [],
        visibility: "private",
        author: user,
        inlineLinks: [],
        createdAt: date,
        lastModifiedAt: date,
      } as Note;

      const dataToSave = Array.isArray(notes) ? [...notes, newNote] : [newNote];

      await DB.set<Note[]>("usernotes", dataToSave);
      set({ note: newNote, notes: dataToSave, isLoading: false });
      return { note: newNote, error: null };
    },
    getNote: async (noteId) => {
      //if the note is already in the store, return it
      if (get().note?.id === noteId){
        return { note: get().note, error: null };
      };

      set({ isLoading: true });

      // get note from db
      const { data: notes, error } = await DB.get<Note[]>("usernotes");
      if (error || !notes) {
        set({ isLoading: false });
        return { note: null, error: new Error("Note not found") };
      }
      const note = notes.find((n) => n.id === noteId);

      if (!note) {
        set({ isLoading: false });
        return { note: null, error: new Error("Note not found") };
      }

      set({ note: note, isLoading: false });

      return { note: note, error: null };
    },
    updateNote: async (payload) => {
      set({ isLoading: true });
      
      const { data: notes, error: notesError } = await DB.get<Note[]>(
        "usernotes",
        0
      );
      if (notesError || !notes) {
        set({ isLoading: false });
        return { note: null, error: new Error("Something went wrong.") };
      }

      const note = notes.find((n) => n.id === payload.id);
      if (!note) {
        set({ isLoading: false });
        return { note: null, error: new Error("Something went wrong.") };
      }

      const date = new Date().toISOString();

      const updatedNote = {
        ...note,
        ...payload,
        lastModifiedAt: date,
      };

      const dataToSave = notes.map((n) =>
        n.id === payload.id ? updatedNote : n
      );

      await DB.set<Note[]>("usernotes", dataToSave, 0);
      set({ note: updatedNote, notes: dataToSave, isLoading: false });
      return { note: updatedNote, error: null };
    },
    moveToTrash: async (noteId) => {
      set({ isLoading: true });
      const { data: notes, error: notesError } = await DB.get<Note[]>(
        "usernotes",
        0
      );
      if (notesError || !notes) {
        set({ isLoading: false });
        return { note: null, error: new Error("Something went wrong.") };
      }

      const updatedNote = {
        ...notes.find((n) => n.id === noteId),
        visibility: "private",
      } as Note;

      //remove updated note from notes
      const dataToSave = notes.filter((n) => n.id !== noteId);

      //get array of notes from trash and add updated note
      const { data: trash, error: trashError } = await DB.get<Note[]>(
        "trash",
        0
      );
      if (trashError) {
        set({ isLoading: false });
        return { note: null, error: new Error("Something went wrong.") };
      }

      const dataToSaveToTrash = Array.isArray(trash)
        ? [...trash, updatedNote]
        : [updatedNote];

      await DB.set<Note[]>("usernotes", dataToSave, 0);
      await DB.set<Note[]>("trash", dataToSaveToTrash);
      set({ note: updatedNote, notes: dataToSave, isLoading: false });
      return { note: updatedNote, error: null };
    },
    forkNote: async (noteId) => {
      set({ isLoading: true });
      const { data: notes, error: notesError } = await DB.get<Note[]>(
        "notes",
        0
      );

      const { data: usernotes, error: userNotesError } = await DB.get<Note[]>(
        "usernotes",
        0
      );
      if (notesError || !notes || userNotesError) {
        set({ isLoading: false });
        return { note: null, error: new Error("Something went wrong.") };
      }

      const { data: user, error: userError } = await DB.get<User>(
        "currentUser",
        0
      );
      if (userError || !user) {
        set({ isLoading: false });
        return { note: null, error: new Error("Something went wrong.") };
      }

      const noteToBeForked = notes.find((n) => n.id === noteId);

      if (!noteToBeForked) {
        set({ isLoading: false });
        return { note: null, error: new Error("Note not found.") };
      }

      //fork new note
      const newNote = {
        ...noteToBeForked,
        id: faker.datatype.uuid(),
        forks: [],
        likes: [],
      };

      //add new user to forks
      const forkedNote = {
        ...noteToBeForked,
        forks: [...noteToBeForked.forks, user],
      };

      const array = notes.map((n) => (n.id === noteId ? forkedNote : n));

      await DB.set<Note[]>("notes", array, 0);

      if (!usernotes) {
        await DB.set<Note[]>("usernotes", [newNote], 0);
      } else {
        await DB.set<Note[]>("usernotes", [...usernotes, newNote], 0);
      }

      set({ note: newNote, isLoading: false });
      return { note: newNote, error: null };
    },
  },
}));

const fetchNotes = async () => {
  const { data: notes, error } = await DB.get<Note[]>("usernotes");
  if (error) {
    throw new Error(error.message);
  }
  if (!notes) {
    return null;
  }
  return notes;
};

export const useUserNotes = () => {
  const note = useUserNotesStore((state) => state.note);
  const notes = useUserNotesStore((state) => state.notes);
  const isLoading = useUserNotesStore((state) => state.isLoading);
  const { setLoading, setNotes, createNote, getNote, updateNote, moveToTrash } = useUserNotesStore((state) => state.actions);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchNotes()
      .then((notes) => {
        if (isMounted && notes) {
          setNotes(notes);
        }
      })
      .finally(() => setLoading(false));
    return () => {
      isMounted = false;
    };
  }, [setLoading, setNotes]);

  return {
    note,
    notes,
    isLoading,
    createNote,
    getNote,
    updateNote,
    moveToTrash,
  };
};
