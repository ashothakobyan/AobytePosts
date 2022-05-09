import React from "react";

import replayIcon from "../../../assets/replay-icon.png";
import smileyIcon from "../..//../assets/smiley/smiley.png";
import styles from "./Comment.module.css";

import CommentReplay from "../commentReplay/CommentReplay";
import AddReplay from "../addReplay/AddReplay";
import SmileyIcons from "../smileyIcons/SmileyIcons";
import { PostContext } from "../../../Contexts/PostsContext";
class Comment extends React.Component {
  static contextType = PostContext;
  constructor() {
    super();
    this.state = {
      replayState: false,
      smileyIconsState: false,
      smileySrc: smileyIcon,
    };
  }

  changeReplayState = () => {
    this.setState({
      replayState: !this.state.replayState,
    });
  };
  changeSmileyState = () => {
    this.setState({
      smileyIconsState: !this.state.smileyIconsState,
    });
  };

  changeSmiley = (smiley) => {
    this.setState({
      smileySrc: smiley,
      smileyIconsState: !this.state.smileyIconsState,
    });
  };

  render() {
    const { comment, disabled, column } = this.props;
    const { popUpState } = this.context;
    return (
      <div className={styles.comment}>
        <div className={styles.container}>
          <h6 className={styles.context}>{comment.context}</h6>
          {comment.replay.map((replay, index) => (
            <CommentReplay key={index} replay={replay} />
          ))}
          <AddReplay
            commentIndex={this.props.commentIndex}
            postId={this.props.postId}
            changeReplayState={this.changeReplayState}
            replayState={this.state.replayState}
          />
          <SmileyIcons
            changeSmiley={this.changeSmiley}
            smileyIconsState={this.state.smileyIconsState}
          />
        </div>

        <div
          className={`${styles.rate} ${
            comment.rate < 3
              ? styles.bad
              : comment.rate < 4
              ? styles.normal
              : styles.good
          }`}
        >
          {comment.rate}
        </div>
        <img
          className={styles.replayIcon}
          src={replayIcon}
          onClick={
            (!disabled || column) && !popUpState ? this.changeReplayState : null
          }
          alt=""
        />
        <img
          onClick={
            (!disabled || column) && !popUpState ? this.changeSmileyState : null
          }
          src={this.state.smileySrc}
          className={styles.smileyIcon}
          alt=""
        />
      </div>
    );
  }
}

export default Comment;
