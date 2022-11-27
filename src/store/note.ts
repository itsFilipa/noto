import { faker } from "@faker-js/faker";
import create from "zustand";
import { DB } from "../lib/db";
import { User } from "./user";

export interface Tag {
  id: string;
  name: string;
  count: number;
  createdAt: string;
}

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
  isLoading: boolean;
  actions: {
    getNote: (noteId: string) => Promise<{ note: Note | null; error: Error | null }>;
    createNote: () => Promise<{ note: Note | null; error: Error | null }>;
    updateNote: (payload: Omit<Note, "lastModifiedAt">) => Promise<{ note: Note | null; error: Error | null }>;
    moveToTrash: (noteId: string) => Promise<{ note: Note | null; error: Error | null }>;
    forkNote: (noteId: string) => Promise<{ note: Note | null; error: Error | null }>;
    likeNote: (noteId: string) => Promise<{ note: Note | null; error: Error | null }>;
    unlikeNote: (noteId: string) => Promise<{ note: Note | null; error: Error | null }>;
    listNotes: (payload: {
      userId?: string;
      tagId?: string[];
      forked?: boolean;
      liked?: boolean;
      sortBy?: {
        alfabetical: "asc" | "desc";
        createdAt: "asc" | "desc";
        lastModifiedAt: "asc" | "desc";
      };
    }) => Promise<{ notes: Note[] | null; error: Error | null }>;
     // query against title, content, tags.
     query: (query: string) => Promise<{ notes: Note[] | null; error: Error | null }>;
  };
}

const useNoteStore = create<NoteStore>((set, store) => ({
  note: null,
  isLoading: false,
  actions: {
    getNote: async (noteId) => {
      set({ isLoading: true });
      // get note from db
      const {data: notes, error} = await DB.get<Note[]>("notes");
      if(error || !notes) {
        set({ isLoading: false });
        return { note: null, error: new Error("Note not found") };
      }
      const note = notes.find((n) => n.id === noteId);

      if(!note) {
        set({ isLoading: false });
        return { note: null, error: new Error("Note not found") };
      }

      set({note: note, isLoading: false});

      return { note: note, error: null };
    },
    createNote: async () => {
      set({ isLoading: true });

      const { data: user, error: userError } = await DB.get<User>("currentUser", 0);
      if(userError || !user) {
        set({ isLoading: false });
        return { note: null, error: new Error("Something went wrong.") };
      }

      const { data: notes, error: notesError } = await DB.get<Note[]>("notes", 0);
      if(notesError) {
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
      set({note: newNote, isLoading: false});
      return{ note: newNote, error: null };

  },
  updateNote: async (payload) => {
    set({ isLoading: true });
    const { data: notes, error: notesError } = await DB.get<Note[]>("notes", 0);
    if(notesError || !notes) {
      set({ isLoading: false });
      return { note: null, error: new Error("Something went wrong.") };
    }

    const date = new Date().toISOString();

    const updatedNote = {
      ...payload,
      lastModifiedAt: date,
    }

    const dataToSave = notes.map((n) => n.id === payload.id ? updatedNote : n);

    await DB.set<Note[]>("notes", dataToSave);
    set({note: updatedNote, isLoading: false});
    return{ note: updatedNote, error: null };
  },
  moveToTrash: async (noteId) => {
    set({ isLoading: true });
    const { data: notes, error: notesError } = await DB.get<Note[]>("notes", 0);
    if(notesError || !notes) {
      set({ isLoading: false });
      return { note: null, error: new Error("Something went wrong.") };
    }

    const updatedNote = {
      ...notes.find((n) => n.id === noteId),
      visibility: "private",
    } as Note;

    const dataToSave = notes.map((n) => n.id === noteId ? updatedNote : n);

    await DB.set<Note[]>("notes", dataToSave);
    set({note: updatedNote, isLoading: false});
    return{ note: updatedNote, error: null };
  },
  forkNote: async (noteId) => {
    set({ isLoading: true });
    const { data: notes, error: notesError } = await DB.get<Note[]>("notes", 0);
    if(notesError || !notes) {
      set({ isLoading: false });
      return { note: null, error: new Error("Something went wrong.") };
    }

    const { data: user, error: userError } = await DB.get<User>("currentUser", 0);
    if(userError || !user) {
      set({ isLoading: false });
      return { note: null, error: new Error("Something went wrong.") };
    }

    const noteToBeForked = notes.find((n) => n.id === noteId);

    if(!noteToBeForked) {
      set({ isLoading: false });
      return { note: null, error: new Error("Note not found.") };
    }

    //fork new note
    const newNote = {
      ...noteToBeForked,
      id: faker.datatype.uuid(),
      forks: [],
      likes: [],
    }

    //add new user to forks
    const forkedNote = {
      ...noteToBeForked,
      forks: [...noteToBeForked.forks, user],
    }

    const array = notes.map((n) => n.id === noteId ? forkedNote : n);


    const dataToSave = [...array, newNote];
    await DB.set<Note[]>("notes", dataToSave);
    set({note: newNote, isLoading: false});
    return{ note: newNote, error: null };
  },
  likeNote: async (noteId) => {
    set({ isLoading: true });
    const { data: notes, error: notesError } = await DB.get<Note[]>("notes", 0);
    if(notesError || !notes) {
      set({ isLoading: false });
      return { note: null, error: new Error("Something went wrong.") };
    }
  
    const { data: user, error: userError } = await DB.get<User>("currentUser", 0);
    if(userError || !user) {
      set({ isLoading: false });
      return { note: null, error: new Error("Something went wrong.") };
    }
    
    const noteToBeLiked = notes.find((n) => n.id === noteId);

    if(!noteToBeLiked) {
      set({ isLoading: false });
      return { note: null, error: new Error("Note not found.") };
    }

    const likedNote = {
      ...noteToBeLiked,
      likes: [...noteToBeLiked.likes, user],
    }

    const dataToSave = notes.map((n) => n.id === noteId ? likedNote : n);
    await DB.set<Note[]>("notes", dataToSave);
    set({note: likedNote, isLoading: false});
    return{ note: likedNote, error: null };
  },
  unlikeNote: async (noteId) => {
    set({ isLoading: true });
    const { data: notes, error: notesError } = await DB.get<Note[]>("notes", 0);
    if(notesError || !notes) {
      set({ isLoading: false });
      return { note: null, error: new Error("Something went wrong.") };
    }

    const { data: user, error: userError } = await DB.get<User>("currentUser", 0);
    if(userError || !user) {
      set({ isLoading: false });
      return { note: null, error: new Error("Something went wrong.") };
    }

    const noteToBeUnliked = notes.find((n) => n.id === noteId);

    if(!noteToBeUnliked) {
      set({ isLoading: false });
      return { note: null, error: new Error("Note not found.") };
    }

    const unlikedNote = {
      ...noteToBeUnliked,
      likes: noteToBeUnliked.likes.filter((u) => u.id !== user.id),
    }

    const dataToSave = notes.map((n) => n.id === noteId ? unlikedNote : n);
    await DB.set<Note[]>("notes", dataToSave);
    set({note: unlikedNote, isLoading: false});
    return{ note: unlikedNote, error: null };
  },
  listNotes: async (payload) => {
    set({ isLoading: true });
    const { data: notes, error: notesError } = await DB.get<Note[]>("notes", 0);
    if(notesError || !notes) {
      set({ isLoading: false });
      return { notes: [], error: new Error("Something went wrong.") };
    }

    const result: Note[] = [];

    // const filteredNotes = notes.filter((n) => {
    //   if(payload.userId) {
    //     return n.author.profile.username === payload.userId;
    //   }
    //   if(payload.forked){
    //     return n.forks.length > 0;
    //   }
    //   if(payload.liked){
    //     return n.likes.length > 0;
    //   }
    //   if(payload.tagId){
    //     //for each tag in tagIds, check if it is in the note's tagIds and 
    //   }

    return { notes, error: null };
  },
  query: async (query) => {
    const { data: notes, error: error } = await DB.get<Note[]>("notes", 0);
    if(error || !notes) {
      return { notes: [], error: new Error("Something went wrong.") };
    }
    
    const result = notes.filter((n) => {
      return n.title.toLowerCase().includes(query.toLowerCase());
    });
    // set({ notes: result, isLoading: false });
    return({ notes: result, error: null });
  },
},}));