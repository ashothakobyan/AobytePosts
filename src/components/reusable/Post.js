import React from "react";
import Comment from "../comments/Comment";

import "../../css/Post.css";
import AddComment from "../comments/AddComment";
class Post extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { post, column } = this.props;

    return (
      <div
        className={`post ${column ? "column" : ""} ${
          !column && post.disabled ? "disabled" : ""
        }`}
      >
        <h6 className="post--title">{post.title}</h6>
        <div className="post--comments">
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
