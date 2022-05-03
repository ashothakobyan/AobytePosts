import React from "react";
import Post from "../reusable/Post";

import "../../css/Pool.css";
import Pagination from "../Pagination/Pagination";
import { postPerPage } from "../Pagination/PaginationFunctions";

class Pool extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postsPerPage: 4,
      currentPage: 1,
      posts: this.props.posts,
      filteredPosts: null,
      postsLengthForPaginate: this.props.posts.length,
    };
  }

  filterPosts = (value) => {
    const filteredPostsArr = this.props.posts.filter((post) => {
      if (post.title.toLocaleLowerCase().includes(value.toLocaleLowerCase())) {
        return post;
      } else {
        const filteredComments = post.comments.filter((comment) => {
          if (
            comment.context
              .toLocaleLowerCase()
              .includes(value.toLocaleLowerCase())
          ) {
            return comment;
          }
          return false;
        });
        if (filteredComments.length) {
          return post;
        }
        return false;
      }
    });
    const filteredPosts = postPerPage(
      this.state.currentPage,
      this.state.postsPerPage,
      filteredPostsArr
    );
    this.setState({
      filteredPosts: filteredPosts,
      postsLengthForPaginate: filteredPostsArr.length,
    });
  };
  paginate = (number) => {
    this.setState({ currentPage: number });
  };
  componentDidMount() {
    const { currentPage, postsPerPage, posts } = this.state;
    const filteredPosts = postPerPage(currentPage, postsPerPage, posts);
    this.setState({
      filteredPosts: filteredPosts,
    });
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevState.currentPage !== this.state.currentPage) {
      const { currentPage, postsPerPage, posts } = this.state;
      const filteredPosts = postPerPage(currentPage, postsPerPage, posts);
      return filteredPosts;
    }
    return null;
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot !== null) {
      this.setState({
        filteredPosts: snapshot,
      });
    }
  }
  render() {
    const { popUpState } = this.props;
    const { currentPage, postsPerPage, filteredPosts, postsLengthForPaginate } =
      this.state;
    return (
      <div className="pool">
        <div className="pool-searchBar">
          <input
            onChange={(e) =>
              !popUpState ? this.filterPosts(e.target.value) : null
            }
            placeholder="...Search"
            type="text"
            className="searchBar--input"
          />
        </div>
        <div className="pool-posts">
          {filteredPosts?.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={postsLengthForPaginate}
          currentPage={currentPage}
          paginate={this.paginate}
        />
      </div>
    );
  }
}

export default Pool;
