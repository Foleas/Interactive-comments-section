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
        {comments?.map((c) => (
          <CommentBox
            key={`comment-${c.id}`}
            content={c.content}
            user={c.user}
            createdAt={c.createdAt}
            score={c.score}
          />
        ))}
      </div>
    </main>
  );
}

export default App;
