import { useState, useEffect } from "react";
import CommentBox from "./components/CommentBox";
import {
  CommentItem,
  CommentUser,
  UserVote,
  ScoreAction,
  AddCommentHandler,
  EditCommentHandler,
} from "./types";
import React from "react";
import localStorage from "./services/localStorage";
import ReplyBox from "./components/ReplyBox";
import ModalDelete from "./components/ModalDelete";
import commentService from "./services/commentService";

function App() {
  const [currentUser, setCurrentUser] = useState<CommentUser>({
    image: {
      png: "",
      webp: "",
    },
    username: "",
  });
  const [comments, setComments] = useState<Array<CommentItem>>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState<number | null>(
    null
  );

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const currentUser = await commentService.getCurrentUser("./data.json");
        setCurrentUser(currentUser);
        localStorage.set("currentUser", currentUser);
        const allComments = await commentService.getAll("./data.json");
        setComments(allComments);
        localStorage.set("comments", allComments);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    if (localStorage.get("comments")) {
      setCurrentUser(localStorage.get("currentUser") as CommentUser);
      setComments(localStorage.get("comments") as CommentItem[]);
    } else {
      fetchDataAsync();
    }
  }, []);

  const updateScoreData = (id: number, score: number, action: ScoreAction) => {
    const updatedComments = comments.map((comment) => {
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

    setComments(updatedComments);
    localStorage.set("comments", updatedComments);
  };

  const addCommentData: AddCommentHandler = (
    user,
    content,
    replyingTo,
    parentId = 0
  ) => {
    // console.log("addCommentData", "parentID", parentId);
    const newId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);

    const newComment: CommentItem = {
      id: newId,
      content: content.replace(`@${replyingTo}`, ""),
      createdAt: Date.now(),
      score: 0,
      user: {
        image: {
          png: user.image.png,
          webp: user.image.webp,
        },
        username: user.username,
      },
      replyingTo,
      replies: [],
      userVotes: [],
    };

    if (parentId === 0) {
      setComments([...comments, newComment]);
    } else {
      setComments(updateComment(comments, parentId, newComment));
    }
  };

  const updateComment = (
    comments: CommentItem[],
    parentId: number,
    newComment: CommentItem
  ) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: comment.replies
            ? [...comment.replies, newComment]
            : [newComment],
        };
      } else if (comment.replies && comment.replies.length > 0) {
        // updateComment(comment.replies, parentId, newComment);
        const updatedReplies: CommentItem[] = updateComment(
          comment.replies,
          parentId,
          newComment
        );
        return {
          ...comment,
          replies: updatedReplies,
        };
      }
      return comment;
    });

    return updatedComments;
  };

  const editComment: EditCommentHandler = (id, content, array) => {
    const thisComments = array ? array : comments;

    return thisComments.map((c) => {
      if (c.id === id) {
        return {
          ...c,
          content,
        };
      } else if (c.replies && c.replies.length > 0) {
        // updateComment(comment.replies, parentId, newComment);
        const updatedReplies: CommentItem[] = editComment(
          id,
          content,
          c.replies
        );
        return {
          ...c,
          replies: updatedReplies,
        };
      }
      return c;
    });
  };

  const deleteComment = (
    comments: CommentItem[],
    commentId: number
  ): CommentItem[] => {
    comments.forEach((c, i, arr) => {
      if (c.id === commentId) {
        arr.splice(i, 1);
        return;
      }

      if (c.replies && c.replies.length > 0) {
        deleteComment(c.replies, commentId);
      }
    });

    return comments;
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
              onEditComment={editComment}
              onDeleteComment={() => {
                setShowDeleteModal(true);
                setCommentIdToDelete(id);
              }}
              setComments={setComments}
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
        {renderComments(comments)}
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
              const updatedComments = deleteComment(
                comments,
                commentIdToDelete
              );
              setComments(updatedComments);
              localStorage.set("comments", updatedComments);
              setShowDeleteModal(false);
            }
          }}
        />
      )}
    </main>
  );
}

export default App;
