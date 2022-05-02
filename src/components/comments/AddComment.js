import React from "react";
import addIcon from "../../assets/add-icon.png";
import closeIcon from "../../assets/close-icon.png";
import { PostContext } from "../../Contexts/PostsContext";

class AddComment extends React.Component {
  static contextType = PostContext;
  constructor(props) {
    super(props);
    this.state = {
      addCommentState: false,
      inputValue: "",
      rate: 0,
    };
  }

  changeRate = (value) => {
    this.setState({
      rate: value,
    });
  };

  changeAddState = () => {
    this.setState({
      addCommentState: !this.state.addCommentState,
    });
  };
  changeInputValue = (value) => {
    this.setState({ inputValue: value });
  };

  addCommentCallBack = () => {
    if (this.state.inputValue) {
      const { addComment } = this.context;
      const comment = {
        rate: this.state.rate,
        context: this.state.inputValue,
        replay: [],
      };
      this.setState({
        rate: 0,
        inputValue: "",
        addCommentState: !this.state.addCommentState,
      });
      addComment(this.props.id, comment);
    }
  };
  render() {
    const rates = Array.from({ length: 10 }).map((el, i) => {
      return (el = i);
    });
    const { disabled, column } = this.props;
    const { popUpState } = this.context;
    return (
      <div className="post--addComment">
        <img
          alt=""
          src={this.state.addCommentState ? closeIcon : addIcon}
          className="addComment--img"
          onClick={
            (!disabled || column) && !popUpState ? this.changeAddState : null
          }
        />
        <div
          className={`addComment--container ${
            this.state.addCommentState ? "activeComment" : ""
          }`}
        >
          <input
            className="addComment--input"
            onChange={(e) => this.changeInputValue(e.target.value)}
            value={this.state.inputValue}
          />
          <select
            value={this.state.rate}
            onChange={(e) => this.changeRate(e.target.value)}
          >
            {rates.map((rate) => (
              <option key={rate}>{rate}</option>
            ))}
          </select>
          <button onClick={this.addCommentCallBack}>Add</button>
        </div>
      </div>
    );
  }
}

export default AddComment;
