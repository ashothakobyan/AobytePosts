import React from "react";
import addIcon from "../../assets/add-icon.png";
import upDown from "../../assets/up-and-down-icon.png";
import "../../css/ContainerColumn.css";
import Pagination from "../Pagination/Pagination";
import { postPerPage } from "../Pagination/PaginationFunctions";
import Post from "../reusable/Post";
import DeletePost from "./DeletePost";
class ContainerColumn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postsPerPage: 4,
      currentPage: 1,
      columnDirection: "UP",
      filteredPosts: [],
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
      if (newArr.length > this.state.postsPerPage) {
        newArr = postPerPage(
          this.state.currentPage,
          this.state.postsPerPage,
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
      if (newArr.length > this.state.postsPerPage) {
        newArr = postPerPage(
          this.state.currentPage,
          this.state.postsPerPage,
          newArr
        );
      }
      this.setState({
        filteredPosts: newArr,
        columnDirection: "UP",
      });
    }
  };

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevState.currentPage !== this.state.currentPage) {
      const { currentPage, postsPerPage } = this.state;
      const { posts } = this.props;
      const filteredPosts = postPerPage(currentPage, postsPerPage, posts);
      return filteredPosts;
    }
    if (prevProps.posts.length !== this.props.posts.length) {
      if (this.props.posts.length > this.state.postsPerPage) {
        const { currentPage, postsPerPage } = this.state;
        const { posts } = this.props;
        const filteredPosts = postPerPage(currentPage, postsPerPage, posts);
        return filteredPosts;
      }
      return this.props.posts;
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
    const { posts, side, popUpState } = this.props;
    const { currentPage, postsPerPage, filteredPosts } = this.state;

    return (
      <div className={`containerColumn ${this.props.side}`}>
        <div className="header">
          <img
            className="header--addIcon"
            src={addIcon}
            onClick={!popUpState ? this.addPost : null}
            alt=""
          />

          <img
            className="header--upDown"
            src={upDown}
            onClick={!popUpState ? this.upToDown : null}
            alt=""
          />
        </div>
        <div className="containerColumn--posts">
          {filteredPosts?.map((post) => (
            <React.Fragment key={post.id}>
              <Post post={post} column={true} />
              <DeletePost side={side} postId={post.id} average={post.average} />
            </React.Fragment>
          ))}
        </div>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          currentPage={currentPage}
          paginate={this.paginate}
        />
      </div>
    );
  }
}

export default ContainerColumn;
