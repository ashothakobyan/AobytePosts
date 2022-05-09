import React from "react";
import laughIcon from "../../../assets/smiley/laugh.png";
import likeIcon from "../../../assets/smiley/like.png";
import sadIcon from "../../../assets/smiley/sad.png";
import smileIcon from "../../../assets/smiley/smile.png";
import styles from "./SmileyIcons.module.css";
class SmileyIcons extends React.Component {
  render() {
    const emojis = [laughIcon, likeIcon, sadIcon, smileIcon];
    const { smileyIconsState, changeSmiley } = this.props;
    return (
      <div
        className={`${styles.container} ${
          smileyIconsState ? styles.emojisActive : ""
        }`}
      >
        {emojis.map((emoji, index) => (
          <img
            onClick={() => changeSmiley(emoji)}
            className={styles.emoji}
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
