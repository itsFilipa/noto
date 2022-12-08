import { faker } from "@faker-js/faker";
import Fuse from "fuse.js";
import { useEffect } from "react";
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
  inlineLinks: string[];
  createdAt: string;
  lastModifiedAt: string;
}

interface NoteStore {
  note: Note | null;
  notes: Note[] | null;
  isLoading: boolean;
  actions: {
    setLoading: (isLoading: boolean) => void;
    setNotes: (notes: Note[]) => void;
    getNote: (
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
      query?: string;
      allPublic?: boolean;
      public?: boolean;
      userId?: string;
      tagName?: string;
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
    setLoading: (isLoading: boolean) => set({ isLoading }),
    setNotes: (notes: Note[]) => set({ notes }),
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

      if(payload.query) {
        const fuse = new Fuse(notes, {
          keys: ["title", "content"],
          threshold: 0.3
        });
        const fuseResult = fuse.search(payload.query);
        const filteredNotes = fuseResult.map((r) => r.item);
        result.push(...filteredNotes);
      }

      //filter by userId
      if (payload.userId) {
        const fuseUser = new Fuse(notes, {
          keys: ["author.id"],
          threshold: 0.0,
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
      if(payload.tagName) {
        const fuseTag = new Fuse(notes, {
          keys: ["tags.name"],
          threshold: 0.0
        });
        const fuseResult = fuseTag.search(payload.tagName);
        const filteredNotes = fuseResult.map((r) => r.item);
        result.push(...filteredNotes);
      }
      if (payload.tag) {
        const fuseTag = new Fuse(notes, {
          keys: ["tags.name"],
          threshold: 0.0,
        });
        const fuseResult = fuseTag.search(payload.tag.name);
        const filteredNotes = fuseResult.map((r) => r.item);
        result.push(...filteredNotes);
      }
      if (payload.tags) {
        const fuseTag = new Fuse(notes, {
          keys: ["tags.name"],
          threshold: 0.0,
        });

        // let fuseResult = [];
        payload.tags.forEach((tag) => {
          const results = fuseTag.search(tag.name).map((r) => r.item);
          result.push(...results);
        });
      }

      if (payload.public) {
        const fusePublic = new Fuse(result, {
          keys: ["visibility"],
          threshold: 0.0,
        });

        const fuseResult = fusePublic.search("public");
        result = fuseResult.map((r) => r.item);
      }

      if (payload.allPublic) {
        const fusePublic = new Fuse(notes, {
          keys: ["visibility"],
          threshold: 0.0,
        });

        const fuseResult = fusePublic.search("public");
        result = fuseResult.map((r) => r.item);
      }

      //set({ notes: result, isLoading: false })
      set({ isLoading: false });
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

const fetchNotes = async () => {
  const { data: notes, error } = await DB.get<Note[]>("notes", 0);
  if (error || !notes) {
    return [];
  }
  return notes;
}

export const useNotes = () => {
  const note = useNoteStore((state) => state.note);
  const notes = useNoteStore((state) => state.notes);
  const isLoading = useNoteStore((state) => state.isLoading);
  const { setLoading, setNotes, getNote, forkNote, likeNote, unlikeNote, listNotes, query } =
    useNoteStore((state) => state.actions);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchNotes()
      .then((notes) => {
        if (isMounted) {
          setNotes(notes);
          setLoading(false);
        }
      })
      .finally(() => {
        setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [setLoading, setNotes]);

  return {
    note,
    notes,
    isLoading,
    getNote,
    forkNote,
    likeNote,
    unlikeNote,
    listNotes,
    query,
  };
};
