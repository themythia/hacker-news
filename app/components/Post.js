import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeConsumer } from '../contexts/Theme';

const Post = ({ title, url, username, userId, postId, date, comment }) => {
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <div className='post'>
          <a href={url} className={`post-title ${theme}`}>
            <b>{title}</b>
          </a>
          <p className='faded'>
            {`by `}
            <Link
              to={{ pathname: '/user', search: `?id=${username}` }}
              className={`link ${theme}`}
            >
              {username}
            </Link>
            {` on ${date} with `}
            <Link
              to={{
                pathname: '/post',
                search: `?id=${postId}`,
              }}
              className={`link ${theme}`}
            >
              {comment}
            </Link>
            {` comments`}
          </p>
        </div>
      )}
    </ThemeConsumer>
  );
};

export default Post;
