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

// FUNCTIONS

export type NewCommentItem = (
  user: CommentUser,
  content: string,
  replyingTo?: string
) => CommentItem;

export type AddCommentItem = (
  comments: CommentItem[],
  parentId: number,
  newComment: CommentItem
) => CommentItem[];

export type EditCommentItem = (
  comments: CommentItem[],
  id: number,
  content: string
) => CommentItem[];

export type DeleteCommentItem = (
  comments: CommentItem[],
  commentId: number
) => CommentItem[];

// FUNCTIONS

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
