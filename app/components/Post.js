import React from 'react';

const Post = ({ title, url, username, date, comment }) => {
  return (
    <React.Fragment>
      <p>
        <a href={url}>{title}</a>
      </p>
      <p>{`by ${username} on ${date} with ${comment} comments`}</p>
    </React.Fragment>
  );
};

export default Post;
