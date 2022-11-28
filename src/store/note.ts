import { faker } from "@faker-js/faker";
import Fuse from "fuse.js";
import create from "zustand";
import { DB } from "../lib/db";
import { Tag } from "./tag";
import { User } from "./user";

export type NoteVisibility = "public" | "private";

export interface Note {
  id: string;
  title: string;
  content: string;
  tags: Tag[] | null;
  likes: User[];
  forks: User[];
  visibility: NoteVisibility;
  author: User;
  inlineLinks: Note[];
  createdAt: string;
  lastModifiedAt: string;
}

interface NoteStore {
  note: Note | null;
  notes: Note[] | null;
  isLoading: boolean;
  actions: {
    getNote: (
      noteId: string
    ) => Promise<{ note: Note | null; error: Error | null }>;
    createNote: () => Promise<{ note: Note | null; error: Error | null }>;
    updateNote: (
      payload: Partial<Note>
    ) => Promise<{ note: Note | null; error: Error | null }>;
    moveToTrash: (
      noteId: string
    ) => Promise<{ note: Note | null; error: Error | null }>;
    forkNote: (
      noteId: string
    ) => Promise<{ note: Note | null; error: Error | null }>;
    likeNote: (
      noteId: string
    ) => Promise<{ note: Note | null; error: Error | null }>;
    unlikeNote: (
      noteId: string
    ) => Promise<{ note: Note | null; error: Error | null }>;
    listNotes: (payload: {
      public: boolean;
      userId?: string;
      tagId?: string[];
      tag?: Tag;
      tags?: Tag[];
      forked?: boolean;
      liked?: boolean;
      sortBy?: {
        alfabetical: "asc" | "desc";
        createdAt: "asc" | "desc";
        lastModifiedAt: "asc" | "desc";
      };
    }) => Promise<{ notes: Note[] | null; error: Error | null }>;
    // query against title, content, tags.
    query: (
      query: string
    ) => Promise<{ notes: Note[] | null; error: Error | null }>;
  };
}

const useNoteStore = create<NoteStore>((set, store) => ({
  note: null,
  notes: null,
  isLoading: false,
  actions: {
    getNote: async (noteId) => {
      set({ isLoading: true });
      // get note from db
      const { data: notes, error } = await DB.get<Note[]>("notes");
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
        "notes",
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

      await DB.set<Note[]>("notes", dataToSave);
      set({ note: newNote, isLoading: false });
      return { note: newNote, error: null };
    },
    updateNote: async (payload) => {
      set({ isLoading: true });
      const { data: notes, error: notesError } = await DB.get<Note[]>(
        "notes",
        0
      );
      if (notesError || !notes) {
        set({ isLoading: false });
        return { note: null, error: new Error("Something went wrong.") };
      }

      const note = notes.find((n) => n.id === payload.id);
      if(!note) {
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

      await DB.set<Note[]>("notes", dataToSave, 0);
      set({ note: updatedNote, isLoading: false });
      return { note: updatedNote, error: null };
    },
    moveToTrash: async (noteId) => {
      set({ isLoading: true });
      const { data: notes, error: notesError } = await DB.get<Note[]>(
        "notes",
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

      await DB.set<Note[]>("notes", dataToSave, 0);
      await DB.set<Note[]>("trash", dataToSaveToTrash);
      set({ note: updatedNote, notes: dataToSave , isLoading: false });
      return { note: updatedNote, error: null };
    },
    forkNote: async (noteId) => {
      set({ isLoading: true });
      const { data: notes, error: notesError } = await DB.get<Note[]>(
        "notes",
        0
      );
      if (notesError || !notes) {
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

      const dataToSave = [...array, newNote];
      await DB.set<Note[]>("notes", dataToSave);
      set({ note: newNote, isLoading: false });
      return { note: newNote, error: null };
    },
    likeNote: async (noteId) => {
      set({ isLoading: true });
      const { data: notes, error: notesError } = await DB.get<Note[]>(
        "notes",
        0
      );
      if (notesError || !notes) {
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

      const noteToBeLiked = notes.find((n) => n.id === noteId);

      if (!noteToBeLiked) {
        set({ isLoading: false });
        return { note: null, error: new Error("Note not found.") };
      }

      const likedNote = {
        ...noteToBeLiked,
        likes: [...noteToBeLiked.likes, user],
      };

      const dataToSave = notes.map((n) => (n.id === noteId ? likedNote : n));
      await DB.set<Note[]>("notes", dataToSave);
      set({ note: likedNote, isLoading: false });
      return { note: likedNote, error: null };
    },
    unlikeNote: async (noteId) => {
      set({ isLoading: true });
      const { data: notes, error: notesError } = await DB.get<Note[]>(
        "notes",
        0
      );
      if (notesError || !notes) {
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

      const noteToBeUnliked = notes.find((n) => n.id === noteId);

      if (!noteToBeUnliked) {
        set({ isLoading: false });
        return { note: null, error: new Error("Note not found.") };
      }

      const unlikedNote = {
        ...noteToBeUnliked,
        likes: noteToBeUnliked.likes.filter((u) => u.id !== user.id),
      };

      const dataToSave = notes.map((n) => (n.id === noteId ? unlikedNote : n));
      await DB.set<Note[]>("notes", dataToSave);
      set({ note: unlikedNote, isLoading: false });
      return { note: unlikedNote, error: null };
    },
    listNotes: async (payload) => {
      set({ isLoading: true });
      const { data: notes, error: notesError } = await DB.get<Note[]>(
        "notes",
        0
      );
      if (notesError || !notes) {
        set({ isLoading: false });
        return { notes: [], error: new Error("Something went wrong.") };
      }

      let result: Note[] = [];

      //filter by userId
      if (payload.userId) {
        const fuseUser = new Fuse(notes, {
          keys: ["author.id"],
          threshold: 0.0
        });
      //   const filteredNotes = notes.filter(
      //     (n) => n.author.id === payload.userId
      //   );
      //   result.push(...filteredNotes);
      // } else {
      //   result.push(...notes);
        const fuseResult = fuseUser.search(payload.userId);
        const filteredNotes = fuseResult.map((r) => r.item);
        result.push(...filteredNotes);
      }
      if(payload.tag) {
        const fuseTag = new Fuse(notes, {
          keys: ["tags.name"],
          threshold: 0.0
        });
        const fuseResult = fuseTag.search(payload.tag.name);
        const filteredNotes = fuseResult.map((r) => r.item);
        result.push(...filteredNotes);
      }
      if(payload.tags) {
        const fuseTag = new Fuse(notes, {
          keys: ["tags.name"],
          threshold: 0.0
        });

        // let fuseResult = [];
        payload.tags.forEach((tag) => {
          const results = fuseTag.search(tag.name).map((r) => r.item);
          result.push(...results);
        })

      }

      if(payload.public){
        const fusePublic = new Fuse(result, {
          keys: ["visibility"],
          threshold: 0.0,
        });
  
        const fuseResult = fusePublic.search("public");
        result = fuseResult.map((r) => r.item);
      }


      set({ notes: result, isLoading: false });
      return { notes: result, error: null };
    },
    query: async (query) => {
      const { data: notes, error: error } = await DB.get<Note[]>("notes", 0);
      if (error || !notes) {
        return { notes: [], error: new Error("Something went wrong.") };
      }

      const result = notes.filter((n) => {
        return n.title.toLowerCase().includes(query.toLowerCase());
      });
      // set({ notes: result, isLoading: false });
      return { notes: result, error: null };
    },
  },
}));

export const useNotes = () => {
  const note = useNoteStore((state) => state.note);
  const notes = useNoteStore((state) => state.notes);
  const isLoading = useNoteStore((state) => state.isLoading);
  const {
    createNote,
    getNote,
    updateNote,
    forkNote,
    likeNote,
    unlikeNote,
    listNotes,
    query,
    moveToTrash
  } = useNoteStore((state) => state.actions);

  return {
    note,
    notes,
    isLoading,
    createNote,
    getNote,
    updateNote,
    forkNote,
    likeNote,
    unlikeNote,
    listNotes,
    query,
    moveToTrash
  };
};
