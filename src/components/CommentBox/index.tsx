import { useState, useEffect } from "react";
import { CommentUser, UserVote, ScoreAction } from "../../types";
import { ReactComponent as IconPlus } from "../../assets/icons/icon-plus.svg";
import { ReactComponent as IconMinus } from "../../assets/icons/icon-minus.svg";
import { ReactComponent as IconReply } from "../../assets/icons/icon-reply.svg";
import { getFormatedDate } from "../../utils/getDate";

interface CommentBoxProps {
  id: number;
  content: string;
  createdAt: number;
  user: CommentUser;
  userVotes: UserVote[];
  score: number;
  updateScoreData: (id: number, newScore: number, action: ScoreAction) => void;
}

const CommentBox = (props: CommentBoxProps) => {
  const { id, content, createdAt, user, userVotes, score, updateScoreData } =
    props;

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

  const buttonClass = "w-full h-[40px] fill-blue-lightGrayish ";

  return (
    <div className="comment bg-white shadow-md rounded-md p-5 flex gap-5 items-start mb-5">
      <div className="score flex-[0_0_40px] bg-gray-light rounded-md">
        <button
          className={`${buttonClass} ${
            scoreAction === "up"
              ? "cursor-not-allowed"
              : "hover:fill-blue-moderate"
          }`}
          disabled={scoreAction === "up"}
          onClick={() => scoreUpHandler()}
        >
          <IconPlus className="ml-auto mr-auto transition-[fill]" />
        </button>
        <p className="font-bold text-blue-moderate text-center">{scoreState}</p>
        <button
          className={`${buttonClass} ${
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
      <div className="content">
        <div className="header flex justify-between items-center gap-3 mb-4">
          <div className="user flex items-center gap-3">
            <img className="w-8" src={user.image.png} alt={user.username} />
            <p className="text-blue-dark font-bold">{user.username}</p>
            <p>{getFormatedDate(createdAt)}</p>
          </div>
          <div className="action">
            <button className="reply-btn flex items-center gap-3 fill-blue-moderate hover:fill-blue-lightGrayish text-blue-moderate hover:text-blue-lightGrayish">
              <IconReply className="transition-[fill]" />
              <p className="transition-colors">Reply</p>
            </button>
          </div>
        </div>
        <div className="comment">
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentBox;
