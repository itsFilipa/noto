// DB Requests go between 1 and 2 seconds.
// 
const randomTime = () => {
  return Math.floor(Math.random() * 150) + 1000;
};

export const DB = {
  get: <T>(key: string, ms?: number) => new Promise<T | null>((resolve) => {
    setTimeout(() => resolve(JSON.parse(localStorage.getItem(key) || "null")), ms || randomTime());
  }),
  set: <T>(key: string, data: T, ms?: number) => new Promise((resolve) => {
    setTimeout(() => {
      localStorage.setItem(key, JSON.stringify(data))
      resolve(undefined)
    }, ms || randomTime());
  }),
  delete: (key: string, ms?: number) => new Promise((resolve) => {
    setTimeout(() => {
      localStorage.removeItem(key)
      resolve(undefined);
    }, ms || randomTime());
  })
}