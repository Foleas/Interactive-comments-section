import { DeleteCommentItem } from "../types";

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
  deleteItem,
};
