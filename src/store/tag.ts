import { faker } from "@faker-js/faker";
import { useEffect } from "react";
import create from "zustand";
import { DB } from "../lib/db";
import { useNotes } from "./";
import { User } from "./user";

export interface Tag {
  id: string;
  name: string;
  count: number;
  createdAt: string;
  userId: string;
}

interface TagStore {
  tag: Tag | null;
  tags: Tag[] | null;
  tagLoading: boolean;
  actions: {
    setLoading: (tagLoading: boolean) => void;
    setTags: (tags: Tag[]) => void;
    getTagByUserId: (userId: string) => Promise< {tags: Tag[] | null; error: Error | null} >;
    getTag: (id: string) => Promise< {tag: Tag | null; error: Error | null} >;
    createTag: (payload: string) => Promise< {tag: Tag | null; error: Error | null} >;
  }
}

const getAllTags = async () => {
  const {data: tags} = await DB.get<Tag[]>('tags');
  return tags;
};

const useTagStore = create<TagStore>((set, get) => ({
  tag: null,
  tags: null,
  tagLoading: false,
  actions: {
    setLoading: (tagLoading: boolean) => set({ tagLoading }),
    setTags: (tags: Tag[]) => set({ tags }),
    getTagByUserId: async (userId: string) => {
      set({ tagLoading: true });
      const {data: tags, error} = await DB.get<Tag[]>("tags");
      const filteredTags = tags?.filter(tag => tag.userId === userId);
      if(!filteredTags) {
        set({ tags: null, tagLoading: false });
        return { tags: null, error: new Error("No tags found") };
      }

      set({ tags: filteredTags, tagLoading: false });
      return { tags: filteredTags, error: null };
  },
    getTag: async (id: string) => {
      set({ tagLoading: true });
      const {data: tags, error} = await DB.get<Tag[]>("tags");
      const filteredTag = tags?.find(tag => tag.id === id);
      if(!filteredTag) {
        set({ tag: null, tagLoading: false });
        return { tag: null, error: new Error("Tag not found") };
      }

      set({ tag: filteredTag, tagLoading: false });
      return { tag: filteredTag, error: null };
  },
    createTag: async (payload) => {
      set({ tagLoading: true });

      const {data: tags} = await DB.get<Tag[]>("tags", 0);

      const {data: user, error: userError} = await DB.get<User>("currentUser", 0);
      if (userError || !user) {
        return { tag: null, error: userError };
      }

      const newTag = {
        id: faker.datatype.uuid(),
        name: payload,
        count: 0,
        createdAt: new Date().toISOString(),
        userId: user.id,
      };

      const dataToSave = Array.isArray(tags) ? [...tags, newTag] : [newTag];
      await DB.set<Tag[]>("tags", dataToSave, 0);
      set({ tag: newTag, tags: dataToSave, tagLoading: false });
      return { tag: newTag, error: null };
  },
}}));

export const useTags = () => {
  const tag = useTagStore((state) => state.tag);
  const tags = useTagStore((state) => state.tags);
  const tagLoading = useTagStore((state) => state.tagLoading);
  const { getTagByUserId, getTag, createTag, setLoading, setTags } = useTagStore(
    (state) => state.actions
  );

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getAllTags().then((tags) => {
      if (isMounted && tags) {
        setTags(tags);
      }
    }).finally(() => setLoading(false));
    return () => {
      isMounted = false;
    };
  }, [setLoading, setTags]);

  return{
    tag,
    tags,
    tagLoading,
    getTagByUserId,
    getTag,
    createTag,
  }
}