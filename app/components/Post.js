import React from 'react';
import { Link } from 'react-router-dom';

const Post = ({ title, url, username, userId, postId, date, comment }) => {
  return (
    <React.Fragment>
      <a href={url} className='post-title'>
        <b>{title}</b>
      </a>
      <p className='faded'>
        {`by `}
        <Link
          to={{ pathname: '/user', search: `?id=${username}` }}
          className='link'
        >
          {username}
        </Link>
        {` on ${date} with `}
        <Link
          to={{
            pathname: '/post',
            search: `?id=${postId}`,
          }}
          className='link'
        >
          {comment}
        </Link>
        {` comments`}
      </p>
    </React.Fragment>
  );
};

export default Post;
