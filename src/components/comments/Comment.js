import React from "react";

import replayIcon from "../../assets/replay-icon.png";
import smileyIcon from "..//../assets/smiley/smiley.png";
import "../../css/Comment.css";

import CommentReplay from "./CommentReplay";
import AddReplay from "./AddReplay";
import SmileyIcons from "./SmileyIcons";
import { PostContext } from "../../Contexts/PostsContext";
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
      <div className="comment">
        <div className="comment--container">
          <h6 className="comment--context">{comment.context}</h6>
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
          className={`comment--rate ${
            comment.rate < 3 ? "bad" : comment.rate < 4 ? "normal" : "good"
          }`}
        >
          {comment.rate}
        </div>
        <img
          className="comment--replayIcon"
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
          className="smileyIcon"
          alt=""
        />
      </div>
    );
  }
}

export default Comment;
