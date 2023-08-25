import httpService from "./httpService";
// import storageService from "../utils/localStorage";
import { CommentItem, CommentUser } from "../types";

const getAll = async (url: string): Promise<CommentItem[]> => {
  const allData = await httpService.fetchData(url);
  return allData.comments;
};

const getCurrentUser = async (url: string): Promise<CommentUser> => {
  const allData = await httpService.fetchData(url);
  return allData.currentUser;
};
/*
export const deleteItem = (id:number; comments:CommentItem[]) => {
  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i];

    if (comment.id === id) {
      // Remove the item at index i
      comments.splice(i, 1);
      return true; // Item was found and deleted
    }

    if (comment.replies && comment.replies.length > 0) {
      // Recursively search for the ID in the replies
      if (deleteItem(id, comment.replies)) {
        return true; // Reply was found and deleted
      }
    }
  }
  return false;
};
*/

export default { getAll, getCurrentUser };
