import { useState, useEffect } from "react";
import CommentBox from "./components/CommentBox";
import {
  CommentItem,
  CommentUser,
  UserVote,
  ScoreAction,
  AddCommentHandler,
} from "./types";
import React from "react";
import localStorage from "./services/localStorage";
import ReplyBox from "./components/ReplyBox";
import ModalDelete from "./components/ModalDelete";
import commentService from "./services/commentService";
import commentsUtils from "./utils/comments";

function App() {
  const [currentUser, setCurrentUser] = useState<CommentUser>({
    image: {
      png: "",
      webp: "",
    },
    username: "",
  });
  const [allComments, setAllComments] = useState<Array<CommentItem>>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState<number | null>(
    null
  );

  const updateCurrentUserState = (user: CommentUser) => {
    setCurrentUser(user);
    localStorage.set("currentUser", user);
  };

  const updateCommentsState = (comments: CommentItem[]) => {
    setAllComments(comments);
    localStorage.set("comments", comments);
  };

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const currentUser = await commentService.getCurrentUser("./data.json");
        updateCurrentUserState(currentUser);
        const allComments = await commentService.getAll("./data.json");
        updateCommentsState(allComments);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    if (localStorage.get("comments")) {
      setCurrentUser(localStorage.get("currentUser") as CommentUser);
      setAllComments(localStorage.get("comments") as CommentItem[]);
    } else {
      fetchDataAsync();
    }
  }, []);

  const updateScoreData = (id: number, score: number, action: ScoreAction) => {
    const updatedComments = allComments.map((comment) => {
      const filteredUserVotes = comment.userVotes
        ? [
            ...comment.userVotes.filter(
              ({ username }) => username !== currentUser?.username
            ),
          ]
        : [];
      const updatedNewUserVotes: UserVote[] = [
        ...filteredUserVotes,
        { username: currentUser?.username, action },
      ];
      if (comment.id === id) {
        // If the comment id matches, update the score
        return {
          ...comment,
          score,
          userVotes: updatedNewUserVotes,
        };
      } else if (comment.replies && comment.replies.length > 0) {
        // If there are replies, recursively update them
        const updatedReplies = comment.replies.map((reply) => {
          if (reply.id === id) {
            return {
              ...reply,
              score,
              userVotes: updatedNewUserVotes,
            };
          }
          return reply;
        });
        return { ...comment, replies: updatedReplies };
      }

      return comment;
    });

    updateCommentsState(updatedComments);
  };

  const addCommentData: AddCommentHandler = (
    user,
    content,
    replyingTo,
    parentId = 0
  ) => {
    const newComment = commentsUtils.newItem(user, content, replyingTo);

    if (parentId === 0) {
      updateCommentsState([...allComments, newComment]);
    } else {
      updateCommentsState(
        commentsUtils.addItem(allComments, parentId, newComment)
      );
    }
  };

  const renderComments = (comments: CommentItem[]) => {
    {
      return comments?.map((c) => {
        const {
          id,
          content,
          user,
          createdAt,
          replyingTo,
          score,
          userVotes,
          replies,
        } = c;
        return (
          <React.Fragment key={`fragment-comment-${id}`}>
            <CommentBox
              key={`comment-${id}`}
              id={id}
              content={content}
              user={user}
              createdAt={createdAt}
              replyingTo={replyingTo}
              userVotes={userVotes?.filter(
                ({ username }) => username === currentUser.username
              )}
              score={score}
              updateScoreData={updateScoreData}
              currentUser={currentUser}
              addCommentData={addCommentData}
              onEditComment={commentsUtils.editItem}
              onDeleteComment={() => {
                setShowDeleteModal(true);
                setCommentIdToDelete(id);
              }}
              allComments={allComments}
              updateCommentsState={updateCommentsState}
            />
            {replies && replies.length > 0 && (
              <div className="replies relative ml-10 pl-10">
                <div className="border-l border-blue-light-grayish block absolute top-0 left-0 w-px h-full shadow-[-2px_0_2px_0_rgba(195,196,239,0.25)]"></div>
                {renderComments(replies)}
              </div>
            )}
          </React.Fragment>
        );
      });
    }
  };

  return (
    <main>
      <div className="comments-list-wrapper max-w-screen-md ml-auto mr-auto pt-10 pb-10">
        {renderComments(allComments)}
        {currentUser && currentUser.username !== "" && (
          <ReplyBox
            user={currentUser}
            buttonText="SEND"
            addCommentData={addCommentData}
          />
        )}
      </div>
      {showDeleteModal && (
        <ModalDelete
          onCancel={() => {
            setShowDeleteModal(false);
            setCommentIdToDelete(null);
          }}
          onConfirm={() => {
            if (commentIdToDelete) {
              updateCommentsState(
                commentsUtils.deleteItem(allComments, commentIdToDelete)
              );
              setShowDeleteModal(false);
            }
          }}
        />
      )}
    </main>
  );
}

export default App;
