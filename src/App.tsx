import { useState, useEffect } from "react";
import axios from "axios";
import CommentBox from "./components/CommentBox";
import { Comment } from "./types";

function App() {
  // const [currentUser, setCurrentUser] = useState([]);
  const [comments, setComments] = useState<Array<Comment>>([]);

  useEffect(() => {
    axios
      .get("./data.json")
      .then((response) => {
        console.log(response);
        setComments(response.data.comments);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <main>
      <div className="comments-list-wrapper max-w-screen-md ml-auto mr-auto pt-10 pb-10">
        {comments?.map((c) => {
          const { id, content, user, createdAt, score, replies } = c;
          return (
            <>
              <CommentBox
                key={`comment-${id}`}
                content={content}
                user={user}
                createdAt={createdAt}
                score={score}
              />
              {replies && replies.length > 0 && (
                <div className="replies relative ml-10 pl-10">
                  <div className="border-l border-blue-light-grayish block absolute top-0 left-0 w-px h-full shadow-[-2px_0_2px_0_rgba(195,196,239,0.25)]"></div>
                  {replies?.map((c) => (
                    <CommentBox
                      key={`comment-reply-${c.id}`}
                      content={c.content}
                      user={c.user}
                      createdAt={c.createdAt}
                      score={c.score}
                    />
                  ))}
                </div>
              )}
            </>
          );
        })}
      </div>
    </main>
  );
}

export default App;
