import React from "react";
import commentIcon from "../../assets/comments-icon.png";

class CommentReplay extends React.Component {
  render() {
    const { replay } = this.props;
    return (
      <div className="comment--reply">
        <img className="reply--icon" src={commentIcon} alt="" />
        {replay}
      </div>
    );
  }
}

export default CommentReplay;
