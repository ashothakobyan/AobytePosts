import React from "react";

import "../../css/Pagination.css";

class Pagination extends React.Component {
  pageNumbers = () => {
    const { postsPerPage, totalPosts } = this.props;
    let pageNumbersArr = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbersArr.push(i);
    }
    return pageNumbersArr;
  };
  render() {
    const { currentPage, paginate } = this.props;
    return (
      <div className="pagination">
        {this.pageNumbers().map((number) => {
          return (
            <div
              className={`pagination--number ${
                currentPage === number ? "active" : ""
              }`}
              key={number}
              onClick={currentPage !== number ? () => paginate(number) : null}
            >
              {number}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Pagination;
