import {
  AddCommentItem,
  DeleteCommentItem,
  EditCommentItem,
  NewCommentItem,
} from "../types";

const newItem: NewCommentItem = (user, content, replyingTo = "") => {
  return {
    id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
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
};

const addItem: AddCommentItem = (comments, parentId, newComment) => {
  const updatedComments = comments.map((comment) => {
    if (comment.id === parentId) {
      return {
        ...comment,
        replies: comment.replies
          ? [...comment.replies, newComment]
          : [newComment],
      };
    } else if (comment.replies && comment.replies.length > 0) {
      const updatedReplies = addItem(comment.replies, parentId, newComment);
      return {
        ...comment,
        replies: updatedReplies,
      };
    }
    return comment;
  });

  return updatedComments;
};

const editItem: EditCommentItem = (comments, id, content) => {
  const updatedComments = comments.map((comment) => {
    if (comment.id === id) {
      return {
        ...comment,
        content,
      };
    } else if (comment.replies && comment.replies.length > 0) {
      const updatedReplies = editItem(comment.replies, id, content);
      return {
        ...comment,
        replies: updatedReplies,
      };
    }
    return comment;
  });

  return updatedComments;
};

const deleteItem: DeleteCommentItem = (comments, commentId) => {
  return comments.filter((comment) => {
    if (comment.id === commentId) {
      return false; // Exclude the comment with the matching ID
    }

    if (comment.replies && comment.replies.length > 0) {
      comment.replies = deleteItem(comment.replies, commentId); // Recursively process replies
    }

    return true; // Include all other comments
  });
};

export default {
  newItem,
  addItem,
  editItem,
  deleteItem,
};
