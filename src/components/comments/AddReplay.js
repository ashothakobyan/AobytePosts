import React from "react";
import addIcon from "../../assets/add-icon.png";

import { PostContext } from "../../Contexts/PostsContext";

class AddReplay extends React.Component {
  static contextType = PostContext;
  constructor(props) {
    super(props);
    this.state = {
      replayInputValue: "",
    };
  }

  changeReplayInputValue = (value) => {
    this.setState({
      replayInputValue: value,
    });
  };
  addReplay = () => {
    if (this.state.replayInputValue) {
      const { addReplayToComment } = this.context;
      const { postId, commentIndex } = this.props;
      this.setState({
        replayInputValue: "",
      });
      this.props.changeReplayState();
      addReplayToComment(postId, commentIndex, this.state.replayInputValue);
    }
  };

  render() {
    return (
      <div
        className={`comment--addReplay ${
          this.props.replayState ? "replayActive" : ""
        }`}
      >
        <input
          value={this.state.replayInputValue}
          className="addReplay--input"
          onChange={(e) => {
            this.changeReplayInputValue(e.target.value);
          }}
        />
        <img
          className="addReplay--img"
          src={addIcon}
          alt=""
          onClick={this.addReplay}
        />
      </div>
    );
  }
}

export default AddReplay;
