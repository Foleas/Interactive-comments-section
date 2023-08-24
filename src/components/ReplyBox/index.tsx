import { useState } from "react";
import { AddCommentHandler, CommentUser } from "../../types";
import Button from "../common/Button";

interface ReplyBoxProps {
  user: CommentUser;
  addCommentData: AddCommentHandler;
}

const ReplyBox = ({ user, addCommentData }: ReplyBoxProps) => {
  const [comment, setComment] = useState("");

  return (
    <div className="comment bg-white shadow-md rounded-md p-5 flex gap-5 items-start">
      <img className="w-[40px]" src={user?.image.png} alt={user?.username} />
      <textarea
        name="comment"
        placeholder="Add a comment..."
        className="rounded-md transition-colors border border-gray-light focus:border-blue-moderate outline-none h-[96px] py-3 px-6 resize-none flex-1"
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <Button
        text="SEND"
        disabled={comment === ""}
        onClickHandler={() => {
          addCommentData(user, comment);
          setComment("");
        }}
      />
    </div>
  );
};

export default ReplyBox;
