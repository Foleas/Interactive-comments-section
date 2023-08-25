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
  replyingTo?: string;
  score: number;
  user: CommentUser;
  replies: CommentItem[];
  userVotes: UserVote[];
};

// COMMENT HANLDLERS

export type UpdateScoreHandler = (
  id: number,
  newScore: number,
  action: ScoreAction
) => void;

export type AddCommentHandler = (
  user: CommentUser,
  content: string,
  replyingTo: string,
  parentId?: number
) => void;

export type EditCommentHandler = (
  // comments: CommentItem[],
  id: number,
  content: string,
  array?: CommentItem[]
) => CommentItem[];
