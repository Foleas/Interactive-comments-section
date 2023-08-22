import { CommentUser, Comment } from "../../types";
import { ReactComponent as IconPlus } from "../../assets/icons/icon-plus.svg";
import { ReactComponent as IconMinus } from "../../assets/icons/icon-minus.svg";
import { ReactComponent as IconReply } from "../../assets/icons/icon-reply.svg";

interface CommentBoxProps {
  content: string;
  createdAt: string;
  score: number;
  user: CommentUser;
}

const CommentBox = (props: CommentBoxProps) => {
  const { user, content, createdAt, score } = props;
  return (
    <div className="comment bg-white shadow-md rounded-md p-5 flex gap-5 items-start mb-5 last:mb-0">
      <div className="score flex-[0_0_40px] bg-gray-light rounded-md">
        <button className="w-full h-[40px] fill-blue-lightGrayish hover:fill-blue-moderate">
          <IconPlus className="ml-auto mr-auto transition-[fill]" />
        </button>
        <p className="font-bold text-blue-moderate text-center">{score}</p>
        <button className="w-full h-[40px] fill-blue-lightGrayish hover:fill-blue-moderate">
          <IconMinus className="ml-auto mr-auto transition-[fill]" />
        </button>
      </div>
      <div className="content">
        <div className="header flex justify-between items-center gap-3 mb-4">
          <div className="user flex items-center gap-3">
            <img className="w-8" src={user.image.png} alt={user.username} />
            <p className="text-blue-dark font-bold">{user.username}</p>
            <p>{createdAt}</p>
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
