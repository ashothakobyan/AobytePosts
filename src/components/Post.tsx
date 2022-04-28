import React, { Component } from "react";
import { feackPosts } from "../fackDatas/feackData";
import { IComent, IPosts } from "../moduls/moduls";
import { v4 as uuidv4 } from "uuid";
import "../css/posts.css";

class Post extends React.Component<any, any> {
  constructor(props: any, s: any) {
    super(props);
    this.state = {
      ...props,
    };
  }

  render() {
    return (
      <div className={`post ${this.state.post.disabled ? "disable" : null}`}>
        <h4 className="post--title">{this.state.post.title}</h4>
        <div className="post--coments">
          {this.state.post.coments.map((coment: IComent, index: number) => {
            return (
              <div key={uuidv4()} className="post--coments--child">
                <div>{index + 1}</div>
                <div className="child--li">{`${coment.context}  `}</div>
                <div className="child--span">{coment.rate}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Post;
