import { PersistStorage } from "zustand/middleware";
import Cookies from "js-cookie";

export const cookieStorage: PersistStorage<unknown> = {
  getItem: (name: string) => {
    const value = Cookies.get(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: (name: string, value: unknown): void => {
    Cookies.set(name, JSON.stringify(value), {
      expires: 7, // 7 days
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  },
  removeItem: (name: string): void => {
    Cookies.remove(name);
  },
};
