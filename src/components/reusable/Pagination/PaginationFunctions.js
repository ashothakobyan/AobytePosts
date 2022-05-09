const postPerPage = (currentPage, postsPerPage, posts) => {
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  return currentPosts;
};

export { postPerPage };
