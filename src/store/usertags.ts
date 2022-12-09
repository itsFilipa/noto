import { faker } from "@faker-js/faker";
import { useEffect } from "react";
import create from "zustand";
import { Tag, User } from ".";
import { DB } from "../lib/db";

interface UserTagsStore {
  tag: Tag | null;
  tags: Tag[] | null;
  isLoading: boolean;
  actions: {
    setLoading: (isLoading: boolean) => void;
    setTags: (tags: Tag[]) => void;
    getTag: (id: string) => Promise< {tag: Tag | null; error: Error | null} >;
    createTag: (payload: string) => Promise< {tag: Tag | null; error: Error | null} >;
  }
}

const useUserTagStore = create<UserTagsStore>((set, get) => ({
  tag: null,
  tags: null,
  isLoading: false,
  actions: {
    setLoading: (isLoading: boolean) => set({ isLoading }),
    setTags: (tags: Tag[]) => set({ tags }),
    getTag: async (id: string) => {
      set({ isLoading: true });
      const {data: tags} = await DB.get<Tag[]>("usertags");
      const filteredTag = tags?.find(tag => tag.id === id);
      if(!filteredTag) {
        set({ tag: null, isLoading: false });
        return { tag: null, error: new Error("Tag not found") };
      }

      set({ tag: filteredTag, isLoading: false });
      return { tag: filteredTag, error: null };
    },
    createTag: async (payload: string) => {
      set({ isLoading: true });
      const {data: tags} = await DB.get<Tag[]>("usertags", 0);
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

      await DB.set<Tag[]>("usertags", dataToSave);
      set({ tags: dataToSave, isLoading: false });
      return { tag: newTag, error: null };
    }
  }
}));

const fetchTags = async () => {
  const {data: tags} = await DB.get<Tag[]>('usertags');
  return tags;
};

export const useUserTags = () => {
  const tag = useUserTagStore((state) => state.tag);
  const tags = useUserTagStore((state) => state.tags);
  const isLoading = useUserTagStore((state) => state.isLoading);
  const { getTag, createTag, setLoading, setTags } = useUserTagStore(
    (state) => state.actions
  );

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchTags().then((tags) => {
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
    isLoading,
    getTag,
    createTag,
  }
}