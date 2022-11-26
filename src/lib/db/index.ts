const randomTime = (time?: number) => {
  if (time) {
    return time;
  }

  // 150ms to 1 seconds
  return Math.floor(Math.random() * 1000) + 150
};

// Examples:
// store a user: DB.set("auth", user); 
// store notes: DB.set("notes", [...prevNotes, note]);

interface DatabaseEntry<T> {
  data: T | null
  error: Error | null
}

export const DB = {
  createTable: (tableName: string, data: unknown) => {
    const value = localStorage.getItem(tableName);
    if (!value) {
      localStorage.setItem(tableName, JSON.stringify(data));
    }
  },
  get: <T>(key: string, ms?: number) => new Promise<DatabaseEntry<T>>((resolve,) => {
    // check if the key exists
    const value = localStorage.getItem(key);
    if (!value) {
      resolve({
        data: null,
        error: new Error("Key does not exist"),
      });
      return;
    }

    // parse the value
    const parsedValue = JSON.parse(value);
    
    // simulate a network request
    setTimeout(() => resolve({
      data: parsedValue,
      error: null,
    }), randomTime(ms));
  }),
  set: <T>(key: string, data: T, ms?: number) => new Promise((resolve) => {
    setTimeout(() => {
      localStorage.setItem(key, JSON.stringify(data))
      resolve(undefined)
    }, randomTime(ms));
  }),
  remove: (key: string, ms?: number) => new Promise<{error: Error | null}>((resolve, reject) => {
    // check if the key exists
    const value = localStorage.getItem(key);
    if (!value) {
      resolve({
        error: new Error("Key does not exist")
      });
      return;
    }

    setTimeout(() => {
      localStorage.removeItem(key)
      resolve({error: null});
    }, randomTime(ms));
  })
}