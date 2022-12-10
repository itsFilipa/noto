import { faker } from "@faker-js/faker";
import { useEffect } from "react";
import create from "zustand";
import { Note, Tag, useAuthStore, User } from ".";
import type { NoteVisibility } from ".";
import { DB } from "../lib/db";
import { sort } from "fast-sort";
import Fuse from "fuse.js";

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
    sortNotes: (
      order: "asc" | "desc",
      sortBy: "alphabetical" | "createdAt" | "lastModifiedAt"
    ) => void;
    filterNotes: (payload: {
      tags: Tag[] | [];
      mine: boolean;
      forked: boolean;
    }) => { notes: Note[] | null; error: Error | null };
  };
}

export const useUserNotesStore = create<UserNoteStore>((set, get) => ({
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
      if (get().note?.id === noteId) {
        return { note: get().note, error: null };
      }

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
        visibility: "private" as NoteVisibility,
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
    sortNotes: (order, sortBy) => {
      console.log("entered");

      const notes = get().notes;
      if (!notes) return;

      switch (sortBy) {
        case "alphabetical":
          console.log("entered alphabetical");
          if (order === "asc") {
            const sortedNotes = sort(notes).asc((n) => n.title);
            set({ notes: sortedNotes });
          } else {
            const sortedNotes = sort(notes).desc((n) => n.title);
            set({ notes: sortedNotes });
          }
          break;
        case "createdAt":
          if (order === "asc") {
            const sortedNotes = sort(notes).asc((n) => n.createdAt);
            set({ notes: sortedNotes });
          } else {
            const sortedNotes = sort(notes).desc((n) => n.createdAt);
            set({ notes: sortedNotes });
          }
          break;
        case "lastModifiedAt":
          if (order === "asc") {
            const sortedNotes = sort(notes).asc((n) => n.lastModifiedAt);
            set({ notes: sortedNotes });
          } else {
            const sortedNotes = sort(notes).desc((n) => n.lastModifiedAt);
            set({ notes: sortedNotes });
          }
          break;
        default:
          return;
      }
    },
    filterNotes: (payload) => {
      const notes = get().notes;
      if (!notes)
        return { notes: null, error: new Error("Something went wrong.") };

      let filteredNotes: Note[] = [];

      if (payload.tags.length > 0) {
        const fuseTag = new Fuse(notes, {
          keys: ["tags.name"],
          threshold: 0.0,
        });

        payload.tags.forEach((tag) => {
          const result = fuseTag.search(tag.name).map((r) => r.item);
          filteredNotes.push(...result);
        });

        if (payload.mine) {
          const user = useAuthStore.getState().user;

          if (!user)
            return { notes: null, error: new Error("Something went wrong.") };

          const fuseMine = new Fuse(filteredNotes, {
            keys: ["author.id"],
            threshold: 0.0,
          });

          if (payload.mine === true) {
            const result = fuseMine.search(user.id).map((r) => r.item);
            //if the note is already in the filtered notes, don't add it again
            result.forEach((r) => {
              if (!filteredNotes.includes(r)) filteredNotes.push(r);
            });
          } else {
            const result = fuseMine.search(user.id).map((r) => r.item);
            filteredNotes = filteredNotes.filter((n) => !result.includes(n));
          }
        }

        if (payload.forked) {
          const user = useAuthStore.getState().user;

          if (!user)
            return { notes: null, error: new Error("Something went wrong.") };

          if (payload.forked) {
            //add all the notes that the author id is not the same as the current user id
            const result = filteredNotes.filter((n) => n.author.id !== user.id);
            //if the note is already in the filtered notes, don't add it again
            result.forEach((r) => {
              if (!filteredNotes.includes(r)) filteredNotes.push(r);
            });
          } else {
            //remove all the notes that the author id is not the same as the current user id
            filteredNotes = filteredNotes.filter(
              (n) => n.author.id !== user.id
            );
          }
        }
      } else if(payload.tags.length === 0) {
        if (payload.mine) {
          const user = useAuthStore.getState().user;

          if (!user)
            return { notes: null, error: new Error("Something went wrong.") };

          const fuseMine = new Fuse(notes, {
            keys: ["author.id"],
            threshold: 0.0,
          });

          if (payload.mine === true) {
            const result = fuseMine.search(user.id).map((r) => r.item);
            //if the note is already in the filtered notes, don't add it again
            result.forEach((r) => {
              if (!filteredNotes.includes(r)) filteredNotes.push(r);
            });
          } else {
            const result = fuseMine.search(user.id).map((r) => r.item);
            filteredNotes = filteredNotes.filter((n) => !result.includes(n));
          }
        }

        if (payload.forked) {
          const user = useAuthStore.getState().user;

          if (!user)
            return { notes: null, error: new Error("Something went wrong.") };

          if (payload.forked) {
            //add all the notes that the author id is not the same as the current user id
            const result = notes.filter((n) => n.author.id !== user.id);
            //if the note is already in the filtered notes, don't add it again
            result.forEach((r) => {
              if (!filteredNotes.includes(r)) filteredNotes.push(r);
            });
          } else {
            //remove all the notes that the author id is not the same as the current user id
            filteredNotes = filteredNotes.filter(
              (n) => n.author.id !== user.id
            );
          }
        }
      }

      return { notes: filteredNotes, error: null };
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
  const {
    setLoading,
    setNotes,
    createNote,
    getNote,
    updateNote,
    moveToTrash,
    sortNotes,
    filterNotes,
    forkNote
  } = useUserNotesStore((state) => state.actions);

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
    setNotes,
    createNote,
    getNote,
    updateNote,
    moveToTrash,
    sortNotes,
    filterNotes,
    forkNote
  };
};
