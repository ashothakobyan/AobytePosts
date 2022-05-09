import React from "react";
import addIcon from "../../../assets/add-icon.png";
import upDown from "../../../assets/up-and-down-icon.png";
import { posts_Per_Page_Column } from "../../../config/config";
import styles from "./ContainerColumn.module.css";
import Pagination from "../../reusable/Pagination/Pagination";
import { postPerPage } from "../../reusable/Pagination/PaginationFunctions";

import DeletePost from "../deletePost/DeletePost";
import Post from "../../reusable/post/Post";

class ContainerColumn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      columnDirection: "UP",
      postsLengthForPaginate: this.props.posts.length,
    };
  }
  addPost = () => {
    this.props.addPostToColumns(this.props.side);
  };
  paginate = (number) => {
    this.setState({ currentPage: number });
  };
  upToDown = () => {
    if (this.state.columnDirection === "UP") {
      let newArr = this.props.posts.sort((a, b) => {
        return a.average - b.average;
      });
      if (newArr.length > posts_Per_Page_Column) {
        newArr = postPerPage(
          this.state.currentPage,
          posts_Per_Page_Column,
          newArr
        );
      }

      this.setState({
        filteredPosts: newArr,
        columnDirection: "DOWN",
      });
    } else {
      let newArr = this.props.posts.sort((a, b) => {
        return b.average - a.average;
      });
      if (newArr.length > posts_Per_Page_Column) {
        newArr = postPerPage(
          this.state.currentPage,
          posts_Per_Page_Column,
          newArr
        );
      }
      this.setState({
        filteredPosts: newArr,
        columnDirection: "UP",
      });
    }
  };
  render() {
    const { posts, side, popUpState } = this.props;
    const { currentPage } = this.state;

    return (
      <div
        className={`${styles.containerColumn} ${
          this.props.side === "left" ? styles.left : ""
        }`}
      >
        <div className={styles.header}>
          <img
            className={styles.addIcon}
            src={addIcon}
            onClick={!popUpState ? this.addPost : null}
            alt=""
          />

          <img
            className={styles.upDown}
            src={upDown}
            onClick={!popUpState ? this.upToDown : null}
            alt=""
          />
        </div>
        <div className={styles.posts}>
          {postPerPage(currentPage, posts_Per_Page_Column, posts).map(
            (post) => (
              <React.Fragment key={post.id}>
                <Post post={post} column={true} />
                <DeletePost
                  side={side}
                  postId={post.id}
                  average={post.average}
                />
              </React.Fragment>
            )
          )}
        </div>
        <Pagination
          postsPerPage={posts_Per_Page_Column}
          totalPosts={posts.length}
          currentPage={currentPage}
          paginate={this.paginate}
        />
      </div>
    );
  }
}

export default ContainerColumn;
