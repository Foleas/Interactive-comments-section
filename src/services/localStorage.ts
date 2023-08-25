import { CommentItem, CommentUser } from "../types";

const get = (key: string) => {
  const localStorage = window.localStorage.getItem(key);
  if (localStorage !== null) {
    const localStorageJson = JSON.parse(localStorage) as
      | CommentUser
      | CommentItem[];
    return localStorageJson;
  }
  return false;
};

const set = (key: string, value: CommentUser | CommentItem[]) =>
  window.localStorage.setItem(key, JSON.stringify(value));

export default { get, set };
