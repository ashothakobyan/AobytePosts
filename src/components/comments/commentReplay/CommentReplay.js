import React from "react";
import commentIcon from "../../../assets/comments-icon.png";
import styles from "./CommentReplay.module.css";
class CommentReplay extends React.Component {
  render() {
    const { replay } = this.props;
    return (
      <div className={styles.reply}>
        <img className={styles.icon} src={commentIcon} alt="" />
        {replay}
      </div>
    );
  }
}

export default CommentReplay;
