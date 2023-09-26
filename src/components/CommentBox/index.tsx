import { useState, useEffect } from "react";
import {
  CommentUser,
  UserVote,
  ScoreAction,
  AddCommentHandler,
  UpdateScoreHandler,
  CommentItem,
  EditCommentItem,
} from "../../types";
import { getFormatedDate } from "../../utils/getDate";
import ReplyBox from "../ReplyBox";
import Button from "../common/Button";
import ScoreButton from "../common/ScoreButton";
import ActionsButtons from "../common/ActionsButton";

interface CommentBoxProps {
  id: number;
  content: string;
  createdAt: number;
  replyingTo?: string;
  user: CommentUser;
  userVotes: UserVote[];
  score: number;
  updateScoreData: UpdateScoreHandler;
  currentUser: CommentUser;
  addComment: AddCommentHandler;
  onEditComment?: EditCommentItem;
  onDeleteComment?: () => void;
  allComments: CommentItem[];
  updateCommentsState: (comments: CommentItem[]) => void;
}

const CommentBox = (props: CommentBoxProps) => {
  const {
    id,
    content,
    createdAt,
    replyingTo = "",
    user,
    userVotes,
    score,
    updateScoreData,
    currentUser,
    addComment,
    onEditComment,
    onDeleteComment,
    allComments,
    updateCommentsState,
  } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [editComment, setEditComment] = useState(content);
  const [isReplying, setIsReplying] = useState(false);
  const [scoreState, setScoreState] = useState(score);
  const [scoreAction, setScoreAction] = useState<ScoreAction>(
    userVotes && userVotes.length > 0 ? userVotes[0]?.action : "down"
  );

  useEffect(() => {
    updateScoreData(id, scoreState, scoreAction);
  }, [scoreState]);

  const scoreUpHandler = () => {
    if (scoreAction !== "up") {
      setScoreState((prev) => prev + 1);
      setScoreAction("up");
    }
  };

  const scoreDownHandler = () => {
    if (scoreAction !== "down") {
      setScoreState((prev) => prev - 1);
      setScoreAction("down");
    }
  };

  const isSameUser = user.username === currentUser.username;

  return (
    <>
      <div className="comment bg-white shadow-md rounded-md p-5 flex gap-5 items-start mb-5">
        <ScoreButton
          score={scoreState}
          scoreAction={scoreAction}
          upHandler={scoreUpHandler}
          downHandler={scoreDownHandler}
        />
        <div className="content flex-1">
          <div className="header flex justify-between items-center gap-3 mb-4">
            <div className="user flex items-center gap-3">
              <img className="w-8" src={user.image.png} alt={user.username} />
              <p className="text-blue-dark font-bold">{user.username}</p>
              {isSameUser && (
                <span className="bg-blue-moderate text-white font-medium leading-none py-1 px-2 rounded-md">
                  you
                </span>
              )}
              <p>{getFormatedDate(createdAt)}</p>
            </div>
            <ActionsButtons
              sameUser={isSameUser}
              deleteHandler={() => onDeleteComment && onDeleteComment()}
              editHandler={() => setIsEditing(true)}
              replyHandler={() => setIsReplying(!isReplying)}
            />
          </div>
          <div className="comment w-full">
            {isEditing ? (
              <>
                <textarea
                  name="comment"
                  className="rounded-md transition-colors border border-gray-light focus:border-blue-moderate outline-none w-full h-[96px] py-3 px-6 resize-none"
                  value={editComment}
                  onChange={({ target }) => setEditComment(target.value)}
                />
                <Button
                  text="Update"
                  disabled={editComment === ""}
                  onClickHandler={() => {
                    onEditComment &&
                      updateCommentsState(
                        onEditComment(allComments, id, editComment)
                      );
                    setEditComment("");
                    setIsEditing(false);
                  }}
                />
              </>
            ) : (
              <p>
                {replyingTo && (
                  <span className="text-blue-moderate font-bold">
                    @{replyingTo}{" "}
                  </span>
                )}
                {content}
              </p>
            )}
          </div>
        </div>
      </div>
      {isReplying && (
        <ReplyBox
          user={currentUser}
          replyingTo={user.username}
          buttonText="REPLY"
          parentId={id}
          addComment={addComment}
          setIsReplying={setIsReplying}
        />
      )}
    </>
  );
};

export default CommentBox;
