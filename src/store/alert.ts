import { DB } from "../lib/db";
import create from "zustand";

interface Alert {
  success: boolean;
  message: string;
}

interface AlertStore {
  payload: Alert | null;
  actions: {
    setAlert: (payload: Alert) => Promise<void>;
    getAlert: () => Promise<Alert | null>;
    deleteAlert: () => Promise<void>;
  };
}

const useAlertStore = create<AlertStore>((set, store) => ({
  payload: null,
  actions: {
    setAlert: async (payload) => {
      await DB.set("alert", payload);
      set({ payload });
    },
    getAlert: async () => {
      const { data: alert } = await DB.get<Alert>("alert");
      if (alert) {
        set({ payload: alert });
        return alert;
      }
      return null;
    },
    deleteAlert: async () => {
      await DB.set("alert", null);
      set({ payload: null });
    },
  },
}));

export const useAlert = () => {
  const alert = useAlertStore((state) => state.payload);
  const { setAlert, getAlert, deleteAlert } = useAlertStore(
    (state) => state.actions
  );

  return {
    alert,
    setAlert,
    getAlert,
    deleteAlert,
  }
};
