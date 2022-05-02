import React from "react";
import deleteIcon from "../../assets/delete-icon.png";
import { PostContext } from "../../Contexts/PostsContext";

import "../../css/DeletePost.css";

class DeletePost extends React.Component {
  static contextType = PostContext;

  render() {
    const { deletePost, popUpState } = this.context;
    const { postId, side, average } = this.props;

    return (
      <div className="deletePost">
        <div
          className={`deletePost--rate ${
            average < 3 ? "bad" : average < 4 ? "normal" : "good"
          }`}
        >
          {average.toFixed(2)}
        </div>
        <img
          className="deletePost--icon"
          onClick={
            !popUpState
              ? () => {
                  deletePost(postId, side);
                }
              : null
          }
          src={deleteIcon}
          alt=""
        />
      </div>
    );
  }
}

export default DeletePost;
