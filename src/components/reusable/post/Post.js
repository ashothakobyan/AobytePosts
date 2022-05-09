import React from "react";
import Comment from "../../comments/commentWrapper/Comment";

import styles from "./Post.module.css";
import AddComment from "../../comments/addComment/AddComment";

class Post extends React.Component {
  render() {
    const { post, column } = this.props;

    return (
      <div
        className={`${styles.post} ${column ? styles.column : ""} ${
          !column && post.disabled ? styles.disabled : ""
        }`}
      >
        <h6 className={styles.title}>{post.title}</h6>
        <div className={styles.comments}>
          {post.comments.map((comment, index) => (
            <Comment
              key={index}
              comment={comment}
              postId={post.id}
              commentIndex={index}
              disabled={post.disabled}
              column={column}
            />
          ))}
        </div>
        <AddComment id={post.id} disabled={post.disabled} column={column} />
      </div>
    );
  }
}

export default Post;
