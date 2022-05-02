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
      ...this.props,
      postsPerPage: 4,
      currentPage: 1,
      columnDirection: "UP",
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
      const newArr = this.state.posts.sort((a, b) => {
        return a.average - b.average;
      });

      this.setState({
        posts: newArr,
        columnDirection: "DOWN",
      });
    } else {
      const newArr = this.state.posts.sort((a, b) => {
        return b.average - a.average;
      });

      this.setState({
        posts: newArr,
        columnDirection: "UP",
      });
    }
  };
  render() {
    const { posts, side, popUpState } = this.props;
    const { currentPage, postsPerPage } = this.state;

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
          {postPerPage(currentPage, postsPerPage, posts).map((post) => (
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
