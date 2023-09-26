import httpService from "./httpService";
import { CommentItem, CommentUser } from "../types";

const getAll = async (url: string): Promise<CommentItem[]> => {
  const allData = await httpService.fetchData(url);
  return allData.comments;
};

const getCurrentUser = async (url: string): Promise<CommentUser> => {
  const allData = await httpService.fetchData(url);
  return allData.currentUser;
};

export default { getAll, getCurrentUser };
