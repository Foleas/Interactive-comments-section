import axios, { AxiosResponse } from "axios";
import { CommentItem, CommentUser } from "../types";

interface ApiResponse {
  currentUser: CommentUser;
  comments: CommentItem[];
}

export async function fetchData(url: string): Promise<ApiResponse> {
  const response: AxiosResponse<ApiResponse> = await axios.get(url); // Replace with your JSON API URL
  return response.data;
}

export default { fetchData };
