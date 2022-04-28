import React, { Component } from "react";
import { feackPosts } from "../fackDatas/feackData";
import { IPosts } from "../moduls/moduls";
import Post from "./Post";
import { v4 as uuidv4 } from "uuid";

import "../css/myProject.css";
import PostColumns from "./PostColumns";

class MyProject extends React.Component<any, any> {
  addPost: (side: string) => void;
  deletePost: (id: number, side: string) => void;

  constructor(props: IPosts, s = {}) {
    super(props);
    this.state = {
      posts: feackPosts,
      postsForLeftSide: [],
      postsForRigthSide: [],
    };

    this.addPost = (side) => {
      const allPosiblePosts = this.state.posts.filter(
        (post: IPosts) => post.disabled === false
      );
      const allPosiblePostsWithRates = allPosiblePosts.map((post: IPosts) => {
        post.average = 0;

        for (let index = 0; index < post.coments.length; index++) {
          post.average += post.coments[index].rate;
        }
        post.average = post.average / post.coments.length;

        return post;
      });
      if (allPosiblePostsWithRates.length) {
        const postWithMostaverrage = allPosiblePostsWithRates.sort(
          (a: any, b: any) => {
            return b.average - a.average;
          }
        )[0];
        postWithMostaverrage.disabled = true;
        if (side === "left") {
          this.state.postsForLeftSide.push(postWithMostaverrage);
          this.setState({
            ...this.state,
          });
        } else if (side === "rigth") {
          this.state.postsForRigthSide.push(postWithMostaverrage);
          this.setState({
            ...this.state,
          });
        }
      } else {
        alert("There is no more Post");
      }
    };

    this.deletePost = (id, side) => {
      const spliceingPost = this.state.posts.find((post: IPosts) => {
        return post.id === id;
      });
      spliceingPost.disabled = false;
      if (side === "left") {
        const newArr = this.state.postsForLeftSide.filter((post: IPosts) => {
          return post.id !== id;
        });

        this.setState({
          ...this.state,
          postsForLeftSide: newArr,
        });
      } else if (side === "rigth") {
        const newArr = this.state.postsForRigthSide.filter((post: IPosts) => {
          return post.id !== id;
        });

        this.setState({
          ...this.state,
          postsForRigthSide: newArr,
        });
      }
    };
  }

  render() {
    return (
      <div className="myProject">
        <div className="myProject--Posts">
          {this.state.posts.map((post: IPosts) => (
            <Post key={uuidv4()} post={post} />
          ))}
        </div>

        <div className="myProject--contenierColumns">
          <PostColumns
            key={uuidv4()}
            side={"left"}
            addPost={this.addPost}
            posts={this.state.postsForLeftSide}
            deletePosts={this.deletePost}
          />
          <PostColumns
            side={"rigth"}
            addPost={this.addPost}
            key={uuidv4()}
            posts={this.state.postsForRigthSide}
            deletePosts={this.deletePost}
          />
        </div>
      </div>
    );
  }
}

export default MyProject;
