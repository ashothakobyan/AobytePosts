import React from "react";

import styles from "./Pool.module.css";

import { postPerPage } from "../reusable/Pagination/PaginationFunctions";
import { posts_per_page_pool } from "../../config/config";
import { filterPosts } from "../../helperFunctions/helperFunctions";
import Post from "../reusable/post/Post";
import Pagination from "../reusable/Pagination/Pagination";

class Pool extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      currentPage: 1,
      posts: this.props.posts,
    };
  }

  paginate = (number) => {
    this.setState({ currentPage: number });
  };
  componentDidMount() {
    const { currentPage, posts } = this.state;
    const filteredPosts = postPerPage(currentPage, posts_per_page_pool, posts);
    this.setState({
      filteredPosts: filteredPosts,
    });
  }

  onChangeInputValue = (value) => {
    this.setState({
      inputValue: value,
    });
  };
  onSearchPOsts = () => {
    const { posts, inputValue, currentPage } = this.state;
    const filteredPostsArr = filterPosts(posts, inputValue);
    const filteredPosts = postPerPage(
      currentPage,
      posts_per_page_pool,
      filteredPostsArr
    );
    return filteredPosts;
  };
  render() {
    const { popUpState } = this.props;
    const { currentPage, posts, inputValue } = this.state;
    return (
      <div className={styles.pool}>
        <div className={styles.searchBar}>
          <input
            onChange={
              !popUpState
                ? (e) => this.onChangeInputValue(e.target.value)
                : null
            }
            value={inputValue}
            placeholder="...Search"
            type="text"
            className={styles.input}
          />
        </div>
        <div className={styles.posts}>
          {this.onSearchPOsts().map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
        <Pagination
          postsPerPage={posts_per_page_pool}
          totalPosts={filterPosts(posts, inputValue).length}
          currentPage={currentPage}
          paginate={this.paginate}
        />
      </div>
    );
  }
}

export default Pool;
