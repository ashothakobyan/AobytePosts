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
      filteredPosts: this.props.posts,
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
        });
        if (filteredComments.length) {
          return post;
        }
      }
    });
    this.setState({
      filteredPosts: filteredPostsArr,
    });
  };
  paginate = (number) => {
    this.setState({ currentPage: number });
  };
  render() {
    const { popUpState } = this.props;
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
          {postPerPage(
            this.state.currentPage,
            this.state.postsPerPage,
            this.state.filteredPosts
          ).map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
        <Pagination
          postsPerPage={this.state.postsPerPage}
          totalPosts={this.state.filteredPosts.length}
          currentPage={this.state.currentPage}
          paginate={this.paginate}
        />
      </div>
    );
  }
}

export default Pool;
