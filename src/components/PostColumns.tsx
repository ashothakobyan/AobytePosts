import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import { IComent, IPosts } from "../moduls/moduls";

import addIcon from "../asets/add-icon.png";
import upDownIcon from "../asets/up-and-down-icon.png";
import deleteIcon from "../asets/delete-icon.png";

import "../css/postColumns.css";

class PostColumns extends React.Component<any, any> {
  upToDown: () => void;
  constructor(props: IPosts[], s = {}) {
    super(props);
    this.state = {
      ...props,
      columnDirection: "UP",
    };

    this.upToDown = () => {
      if (this.state.columnDirection === "UP") {
        const newArr = this.state.posts.sort((a: any, b: any) => {
          return a.average - b.average;
        });

        this.setState({
          ...this.state,
          posts: newArr,
          columnDirection: "DOWN",
        });
      } else {
        const newArr = this.state.posts.sort((a: any, b: any) => {
          return b.average - a.average;
        });

        this.setState({
          ...this.state,
          posts: newArr,
          columnDirection: "UP",
        });
      }
    };
  }

  render() {
    return (
      <div className="postColumns">
        <div className="postColumns--header">
          <img
            onClick={() => {
              this.state.addPost(this.state.side);
            }}
            className="postColumns--addIcon"
            src={addIcon}
          />
          <img
            className="postColumns--upDown"
            src={upDownIcon}
            onClick={this.upToDown}
          />
        </div>
        {this.state.posts.map((post: IPosts, index: number) => {
          return (
            <div key={uuidv4()} className="postColumns--childe">
              <div className="childe--number">{index + 1}</div>
              <h4 className="childe--title">{post.title}</h4>
              <div className="child--span">{post.average?.toFixed(2)}</div>
              <img
                className="childe--deleteIcon"
                src={deleteIcon}
                onClick={() => {
                  this.state.deletePosts(post.id, this.state.side);
                }}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default PostColumns;
