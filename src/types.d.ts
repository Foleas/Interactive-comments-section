// COMMENT
export type CommentUser = {
  image: {
    png: string;
    webp: string;
  };
  username: string;
};

export type ScoreAction = "up" | "down";

export type UserVote = {
  username: string;
  action: ScoreAction;
};

export type CommentItem = {
  id: number;
  content: string;
  createdAt: number;
  score: number;
  user: CommentUser;
  replies?: CommentItem[];
  userVotes: UserVote[];
};
