import React from "react";
import Pool from "./pool/Pool";
import { PostContext } from "../Contexts/PostsContext";
import PopUp from "./PopUp";
import Container from "./container/Container";

import "../css/Main.css";

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      popUpState: false,
      posts: null,
      postsLeft: [],
      postsRight: [],
    };
  }
  changePopUpState = () =>
    this.setState({
      popUpState: !this.state.popUpState,
    });
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
        const newPostsLeft = [...this.state.postsLeft];
        newPostsLeft.push(addingPost);
        this.setState({
          postsLeft: newPostsLeft,
        });
      } else if (side === "right") {
        const newPostsRight = [...this.state.postsRight];
        newPostsRight.push(addingPost);

        this.setState({
          postsRight: newPostsRight,
        });
      }
    } else {
      this.changePopUpState();
    }
  };

  deletePost = (id, side) => {
    const deletedPost = this.state.posts.find((post) => post.id === id);
    deletedPost.disabled = false;
    if (side === "left") {
      const postsLeft = this.state.postsLeft;
      const newPostsLeft = postsLeft.filter((post) => post.id !== id);

      this.setState({
        postsLeft: newPostsLeft,
      });
    } else if (side === "right") {
      const newPostsRight = this.state.postsRight.filter(
        (post) => post.id !== id
      );

      this.setState({
        postsRight: newPostsRight,
      });
    }
  };
  changePostAverageRate = (post) => {
    let average = 0;
    post.comments.forEach((comment) => (average += comment.rate));

    post.average = average / post.comments.length;

    return post;
  };
  getData = async () => {
    const { fakePosts } = await import("../fakeData/FakeData");
    return fakePosts;
  };
  componentDidMount() {
    this.getData().then((posts) => {
      const PostWithAverage = posts.map((post) => {
        const changedPost = this.changePostAverageRate(post);
        return changedPost;
      });
      this.setState({
        posts: PostWithAverage,
      });
    });
  }

  render() {
    const { posts, popUpState, postsLeft, postsRight } = this.state;
    return (
      <React.Fragment>
        {posts ? (
          <>
            <div className={`main ${popUpState ? "main--opacity" : ""}`}>
              <PostContext.Provider
                value={{
                  addComment: this.addComment,
                  addReplayToComment: this.addReplayToComment,
                  deletePost: this.deletePost,
                  popUpState: popUpState,
                }}
              >
                <div className="main--pool">
                  <Pool posts={posts} popUpState={popUpState} />
                </div>

                <Container
                  postsLeft={postsLeft}
                  postsRight={postsRight}
                  addPostToColumns={this.addPostToColumns}
                />
              </PostContext.Provider>
            </div>
            <PopUp
              changePopUpState={this.changePopUpState}
              popUpState={popUpState}
            />
          </>
        ) : null}
      </React.Fragment>
    );
  }
}

export default Main;
