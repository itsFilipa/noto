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
  tags: Tag[];
  likes: number;
  forks: number;
  visibility: NoteVisibility;
  author: User;
  inlineLinks: Note[];
  createdAt: string;
  lastModifiedAt: string;
}

interface NoteStore {
  isLoading: boolean;
  error: string;
  actions: {
    getNote: (noteId: string) => void;
    createNote: (payload: Partial<Note>) => void;
    updateNote: (payload: Partial<Note>) => void;
    moveToTrash: (noteId: string) => void;
    forkNote: (noteId: string) => void;
    likeNote: (noteId: string) => void;
    unlikeNote: (noteId: string) => void;
    listNotes: (payload: {
      userId?: string;
      tagId?: string | string[];
      forked?: boolean;
      liked?: boolean;
      sortBy?: {
        alfabetical: "asc" | "desc";
        createdAt: "asc" | "desc";
        lastModifiedAt: "asc" | "desc";
      };
    }) => void;
     // query against title, content, tags.
     query: (query: string) => User[]
  };
}
