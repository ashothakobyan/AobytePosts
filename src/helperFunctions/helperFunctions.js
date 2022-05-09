export const filterPosts = (posts, value) => {
  const filteredPostsArr = posts.filter((post) => {
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

  return filteredPostsArr;
};

export const changePostAverageRate = (post) => {
  let average = 0;
  post.comments.forEach((comment) => (average += comment.rate));

  post.average = average / post.comments.length;

  return post;
};
