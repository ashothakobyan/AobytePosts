import React from "react";
import laughIcon from "../../assets/smiley/laugh.png";
import likeIcon from "../../assets/smiley/like.png";
import sadIcon from "../../assets/smiley/sad.png";
import smileIcon from "../../assets/smiley/smile.png";
class SmileyIcons extends React.Component {
  render() {
    const emojis = [laughIcon, likeIcon, sadIcon, smileIcon];
    const { smileyIconsState, changeSmiley } = this.props;
    return (
      <div
        className={`emoji--container ${smileyIconsState ? "emojisActive" : ""}`}
      >
        {emojis.map((emoji, index) => (
          <img
            onClick={() => changeSmiley(emoji)}
            className="emoji"
            src={emoji}
            alt=""
            key={index}
          />
        ))}
      </div>
    );
  }
}

export default SmileyIcons;
