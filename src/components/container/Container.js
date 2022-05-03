import React from "react";
import { PostContext } from "../../Contexts/PostsContext";
import ContainerColumn from "./ContainerColumn";

class Container extends React.Component {
  static contextType = PostContext;
  render() {
    const { postsLeft, postsRight, addPostToColumns } = this.props;
    const { popUpState } = this.context;
    return (
      <div className="main--columns">
        <ContainerColumn
          posts={postsLeft}
          addPostToColumns={addPostToColumns}
          side={"left"}
          popUpState={popUpState}
        />
        <ContainerColumn
          posts={postsRight}
          addPostToColumns={addPostToColumns}
          side={"right"}
          popUpState={popUpState}
        />
      </div>
    );
  }
}

export default Container;
