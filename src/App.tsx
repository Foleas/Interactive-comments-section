import { useState, useEffect } from "react";
import axios from "axios";
import CommentBox from "./components/CommentBox";
import { CommentItem, CommentUser, UserVote, ScoreAction } from "./types";
import React from "react";
import { getLocalStorage, setLocalStorage } from "./utils/localStorage";

function App() {
  const [currentUser, setCurrentUser] = useState<CommentUser>({
    image: {
      png: "",
      webp: "",
    },
    username: "",
  });
  const [comments, setComments] = useState<Array<CommentItem>>([]);

  useEffect(() => {
    if (getLocalStorage("comments")) {
      setCurrentUser(getLocalStorage("currentUser") as CommentUser);
      setComments(getLocalStorage("comments") as CommentItem[]);
    } else {
      axios
        .get("./data.json")
        .then((response) => {
          const allFieldsComments = response.data.comments.map(
            (c: CommentItem) => {
              const updatedComment = { ...c, userVotes: [] };
              return updatedComment;
            }
          );
          setComments(allFieldsComments);
          setCurrentUser(response.data.currentUser);
          setLocalStorage("currentUser", response.data.currentUser);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  const updateScoreData = (id: number, score: number, action: ScoreAction) => {
    const updatedComments = comments.map((comment) => {
      const updatedNewUserVotes: UserVote[] = [
        ...comment.userVotes.filter(
          ({ username }) => username !== currentUser?.username
        ),
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
    setLocalStorage("comments", updatedComments);
  };

  return (
    <main>
      <div className="comments-list-wrapper max-w-screen-md ml-auto mr-auto pt-10 pb-10">
        {comments?.map((c) => {
          const { id, content, user, createdAt, score, userVotes, replies } = c;
          return (
            <React.Fragment key={`fragment-comment-${id}`}>
              <CommentBox
                key={`comment-${id}`}
                id={id}
                content={content}
                user={user}
                createdAt={createdAt}
                userVotes={userVotes?.filter(
                  ({ username }) => username === currentUser.username
                )}
                score={score}
                updateScoreData={updateScoreData}
              />
              {replies && replies.length > 0 && (
                <div className="replies relative ml-10 pl-10">
                  <div className="border-l border-blue-light-grayish block absolute top-0 left-0 w-px h-full shadow-[-2px_0_2px_0_rgba(195,196,239,0.25)]"></div>
                  {replies?.map((c) => (
                    <CommentBox
                      key={`comment-reply-${c.id}`}
                      id={c.id}
                      content={c.content}
                      user={c.user}
                      createdAt={c.createdAt}
                      userVotes={c.userVotes?.filter(
                        ({ username }) => username === currentUser.username
                      )}
                      score={c.score}
                      updateScoreData={updateScoreData}
                    />
                  ))}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </main>
  );
}

export default App;
