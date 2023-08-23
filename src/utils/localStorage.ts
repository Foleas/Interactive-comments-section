import { CommentItem, CommentUser } from "../types";

export const getLocalStorage = (key: string) => {
  const localStorage = window.localStorage.getItem(key);
  if (localStorage !== null) {
    const localStorageJson = JSON.parse(localStorage) as
      | CommentUser
      | CommentItem[];
    return localStorageJson;
  }
  return false;
};

export const setLocalStorage = (
  key: string,
  value: CommentUser | CommentItem[]
) => window.localStorage.setItem(key, JSON.stringify(value));
