import React from "react";
import deleteIcon from "../../../assets/delete-icon.png";
import { PostContext } from "../../../Contexts/PostsContext";

import styles from "./DeletePost.module.css";

class DeletePost extends React.Component {
  static contextType = PostContext;

  render() {
    const { deletePost, popUpState } = this.context;
    const { postId, side, average } = this.props;

    return (
      <div className={styles.deletePost}>
        <div
          className={`${styles.rate} ${
            average < 3 ? styles.bad : average < 4 ? styles.normal : styles.good
          }`}
        >
          {average.toFixed(2)}
        </div>
        <img
          className={styles.icon}
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
