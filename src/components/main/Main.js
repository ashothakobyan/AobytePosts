import React from "react";
import Pool from "../pool/Pool";
import { PostContext } from "../../Contexts/PostsContext";
import PopUp from "../popUp/PopUp";

import styles from "./Main.module.css";
import { changePostAverageRate } from "../../helperFunctions/helperFunctions";
import Container from "../container/containerWrapper/Container";

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
    filteredPost = changePostAverageRate(filteredPost);
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

  getData = async () => {
    const { fakePosts } = await import("../../fakeData/FakeData");
    return fakePosts;
  };
  componentDidMount() {
    this.getData().then((posts) => {
      const postWithAverage = posts.map((post) => {
        const changedPost = changePostAverageRate(post);
        return changedPost;
      });
      this.setState({
        posts: postWithAverage,
      });
    });
  }

  render() {
    const { posts, popUpState, postsLeft, postsRight } = this.state;
    return (
      <React.Fragment>
        {posts ? (
          <>
            <div
              className={`${styles.main} ${popUpState ? styles.opacity : ""}`}
            >
              <PostContext.Provider
                value={{
                  addComment: this.addComment,
                  addReplayToComment: this.addReplayToComment,
                  deletePost: this.deletePost,
                  popUpState: popUpState,
                }}
              >
                <div className={styles.pool}>
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
