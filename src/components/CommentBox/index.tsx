import { useState, useEffect } from "react";
import {
  CommentUser,
  UserVote,
  ScoreAction,
  AddCommentHandler,
  UpdateScoreHandler,
} from "../../types";
import { ReactComponent as IconPlus } from "../../assets/icons/icon-plus.svg";
import { ReactComponent as IconMinus } from "../../assets/icons/icon-minus.svg";
import { ReactComponent as IconReply } from "../../assets/icons/icon-reply.svg";
import { ReactComponent as IconDelete } from "../../assets/icons/icon-delete.svg";
import { ReactComponent as IconEdit } from "../../assets/icons/icon-edit.svg";
import { getFormatedDate } from "../../utils/getDate";
import ReplyBox from "../ReplyBox";

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
  addCommentData: AddCommentHandler;
  onDeleteComment?: () => void;
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
    addCommentData,
    onDeleteComment,
  } = props;

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

  const scoreButtonClass = "w-full h-[40px] fill-blue-lightGrayish ";

  const actionButtonClass =
    "flex items-center gap-3 leading-none hover:fill-blue-lightGrayish hover:text-blue-lightGrayish";
  const actionButtonBlueClass = "fill-blue-moderate text-blue-moderate";
  const actionButtonRedClass = "fill-red-soft text-red-soft";

  return (
    <>
      <div className="comment bg-white shadow-md rounded-md p-5 flex gap-5 items-start mb-5">
        <div className="score flex-[0_0_40px] bg-gray-light rounded-md">
          <button
            className={`${scoreButtonClass} ${
              scoreAction === "up"
                ? "cursor-not-allowed"
                : "hover:fill-blue-moderate"
            }`}
            disabled={scoreAction === "up"}
            onClick={() => scoreUpHandler()}
          >
            <IconPlus className="ml-auto mr-auto transition-[fill]" />
          </button>
          <p className="font-bold text-blue-moderate text-center">
            {scoreState}
          </p>
          <button
            className={`${scoreButtonClass} ${
              scoreAction === "down"
                ? "cursor-not-allowed"
                : "hover:fill-blue-moderate"
            }`}
            disabled={scoreAction === "down"}
            onClick={() => scoreDownHandler()}
          >
            <IconMinus className="ml-auto mr-auto transition-[fill]" />
          </button>
        </div>
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
            <div className="action flex items-center gap-5">
              {isSameUser ? (
                <>
                  <button
                    className={`delete-btn ${actionButtonClass} ${actionButtonRedClass}`}
                    onClick={onDeleteComment}
                  >
                    <IconDelete className="transition-[fill]" />
                    <p className="transition-colors">Delete</p>
                  </button>
                  <button
                    className={`edit-btn ${actionButtonClass} ${actionButtonBlueClass}`}
                    onClick={() => null}
                  >
                    <IconEdit className="transition-[fill]" />
                    <p className="transition-colors">Edit</p>
                  </button>
                </>
              ) : (
                <button
                  className={`reply-btn ${actionButtonClass} ${actionButtonBlueClass}`}
                  onClick={() => setIsReplying(!isReplying)}
                >
                  <IconReply className="transition-[fill]" />
                  <p className="transition-colors">Reply</p>
                </button>
              )}
            </div>
          </div>
          <div className="comment">
            <p>
              {replyingTo && (
                <span className="text-blue-moderate font-bold">
                  @{replyingTo}{" "}
                </span>
              )}
              {content}
            </p>
          </div>
        </div>
      </div>
      {isReplying && (
        <ReplyBox
          user={currentUser}
          replyingTo={user.username}
          buttonText="REPLY"
          parentId={id}
          addCommentData={addCommentData}
          setIsReplying={setIsReplying}
        />
      )}
    </>
  );
};

export default CommentBox;
