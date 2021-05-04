import React from 'react';
import { Link } from 'react-router-dom';

const Post = ({ title, url, username, userId, date, comment }) => {
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
        </span>{' '}
        {`on ${date} with ${comment} comments`}
      </p>
    </React.Fragment>
  );
};

export default Post;
