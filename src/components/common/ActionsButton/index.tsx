import { ReactComponent as IconReply } from "../../../assets/icons/icon-reply.svg";
import { ReactComponent as IconDelete } from "../../../assets/icons/icon-delete.svg";
import { ReactComponent as IconEdit } from "../../../assets/icons/icon-edit.svg";

interface ActionsButtonsProps {
  sameUser: boolean;
  deleteHandler: () => void;
  editHandler: () => void;
  replyHandler: () => void;
}
const ActionsButtons = ({
  sameUser,
  deleteHandler,
  editHandler,
  replyHandler,
}: ActionsButtonsProps) => {
  const actionButtonClass =
    "flex items-center gap-3 leading-none hover:fill-blue-lightGrayish hover:text-blue-lightGrayish";
  const actionButtonBlueClass = "fill-blue-moderate text-blue-moderate";
  const actionButtonRedClass = "fill-red-soft text-red-soft";

  return (
    <div className="action flex items-center gap-5">
      {sameUser ? (
        <>
          <button
            className={`delete-btn ${actionButtonClass} ${actionButtonRedClass}`}
            onClick={deleteHandler}
          >
            <IconDelete className="transition-[fill]" />
            <p className="transition-colors">Delete</p>
          </button>
          <button
            className={`edit-btn ${actionButtonClass} ${actionButtonBlueClass}`}
            onClick={editHandler}
          >
            <IconEdit className="transition-[fill]" />
            <p className="transition-colors">Edit</p>
          </button>
        </>
      ) : (
        <button
          className={`reply-btn ${actionButtonClass} ${actionButtonBlueClass}`}
          onClick={replyHandler}
        >
          <IconReply className="transition-[fill]" />
          <p className="transition-colors">Reply</p>
        </button>
      )}
    </div>
  );
};

export default ActionsButtons;
