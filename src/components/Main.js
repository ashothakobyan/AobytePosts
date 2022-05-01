import React from "react";
import { fakePosts } from "../fakeData/FakeData";
import Pool from "./pool/Pool";

import "../css/Main.css";
import ContainerColumn from "./container/ContainerColumn";

import { PostContext } from "../Contexts/PostsContext";

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: fakePosts,
      postsLeft: [],
      postsRight: [],
    };
  }

  addComment = (id, comment) => {
    const posts = this.state.posts;

    let filteredPost = posts.find((post) => post.id === id);
    filteredPost.comments.push(comment);
    filteredPost = this.changePostAverageRate(filteredPost);
    this.setState({
      posts: posts,
    });
  };

  addReplayToComment = (postId, commentIndex, replayContext) => {
    const posts = this.state.posts;
    const filteredPost = posts.find((post) => post.id === postId);

    const filteredComment = filteredPost.comments.find(
      (comment, index) => index === commentIndex
    );

    filteredComment.replay.push(replayContext);

    this.setState({
      posts: posts,
    });
  };

  addPostToColumns = (side) => {
    const filteredPosts = this.state.posts.filter(
      (post) => post.disabled === false
    );

    if (filteredPosts.length) {
      const addingPost = filteredPosts.sort((a, b) => {
        return b.average - a.average;
      })[0];
      addingPost.disabled = true;
      if (side === "left") {
        const newPostsLeft = this.state.postsLeft;
        newPostsLeft.push(addingPost);
        this.setState({
          postsLeft: newPostsLeft,
        });
      } else if (side === "right") {
        const newPostsRight = this.state.postsRight;
        newPostsRight.push(addingPost);

        this.setState({
          postsRight: newPostsRight,
        });
      }
    } else {
      alert("There is no more Post");
    }
  };

  deletePost = (id, side) => {
    const deletedPost = this.state.posts.find((post) => {
      return post.id === id;
    });
    deletedPost.disabled = false;
    if (side === "left") {
      const postsLeft = this.state.postsLeft;
      const newPostsLeft = postsLeft.filter((post) => {
        return post.id !== id;
      });

      console.log(newPostsLeft);
      this.setState({
        postsLeft: newPostsLeft,
      });
    } else if (side === "right") {
      const newPostsRight = this.state.postsRight.filter((post) => {
        return post.id !== id;
      });

      this.setState({
        postsRight: newPostsRight,
      });
    }
  };
  changePostAverageRate = (post) => {
    let average = 0;
    for (let index = 0; index < post.comments.length; index++) {
      average += post.comments[index].rate;
    }

    post.average = average / post.comments.length;

    return post;
  };
  componentDidMount() {
    const posts = this.state.posts;
    const PostWithAverage = posts.map((post) => {
      const changedPost = this.changePostAverageRate(post);
      return changedPost;
    });
    this.setState({
      posts: PostWithAverage,
    });
  }

  render() {
    return (
      <div className="main">
        <PostContext.Provider
          value={{
            addComment: this.addComment,
            addReplayToComment: this.addReplayToComment,
            deletePost: this.deletePost,
          }}
        >
          <div className="main--pool">
            <Pool posts={this.state.posts} />
          </div>
          <div className="main--columns">
            <ContainerColumn
              posts={this.state.postsLeft}
              addPostToColumns={this.addPostToColumns}
              side={"left"}
            />
            <ContainerColumn
              posts={this.state.postsRight}
              addPostToColumns={this.addPostToColumns}
              side={"right"}
            />
          </div>
        </PostContext.Provider>
      </div>
    );
  }
}

export default Main;
