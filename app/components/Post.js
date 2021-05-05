import React from 'react';
import { Link } from 'react-router-dom';

const Post = ({ title, url, username, userId, postId, date, comment }) => {
  return (
    <React.Fragment>
      <p>
        <a href={url}>{title}</a>
      </p>
      <p>
        {`by `}
        <span>
          <Link
            to={{
              pathname: '/user',
              search: `?id=${username}`,
            }}
          >
            {username}
          </Link>
        </span>
        {` on ${date} with `}
        <span>
          <Link
            to={{
              pathname: '/post',
              search: `?id=${postId}`,
            }}
          >
            {comment}
          </Link>
        </span>
        {` comments`}
      </p>
    </React.Fragment>
  );
};

export default Post;
