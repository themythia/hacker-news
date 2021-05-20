import React from 'react';
import queryString from 'query-string';
import { fetchComments } from '../utils/api';
import Loading from './Loading';
import Post from './Post';
import { Link } from 'react-router-dom';
import ThemeContext from '../contexts/Theme';

// const { playerOne, playerTwo } = queryString.parse(location.search);

const Comment = ({ location }) => {
  const { id } = queryString.parse(location.search);
  const [post, setPost] = React.useState(null);
  const [comments, setComments] = React.useState(null);
  const theme = React.useContext(ThemeContext);

  React.useEffect(() => {
    fetchComments(id)
      .then((data) => {
        setPost(data[0]);
        return data[1];
      })
      .then((commentData) => setComments(commentData))
      .catch((error) => console.warn(error));
  }, [id]);

  const getDate = (num) => {
    const dateObj = new Date(num * 1000);
    return dateObj.toLocaleString();
  };
  return (
    <div className='comments-div'>
      {comments === null && <Loading text='Fetching Comments' />}
      {comments !== null && (
        <Post
          title={post.title}
          url={post.url}
          username={post.by}
          date={getDate(post.time)}
          comment={post.descendants}
          postId={post.id}
        />
      )}
      <ul>
        {comments !== null &&
          comments.map((comment) => {
            return (
              <li key={comment.id} className='comment'>
                <p className='faded'>
                  {`by `}
                  <span>
                    <Link
                      className={`link link-${theme}`}
                      to={{
                        pathname: '/user',
                        search: `?id=${comment.by}`,
                      }}
                    >
                      {comment.by}
                    </Link>
                  </span>
                  {` on ${getDate(comment.time)}`}
                </p>
                <p
                  dangerouslySetInnerHTML={{ __html: comment.text }}
                  className={`comment-text-${theme}`}
                ></p>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
export default Comment;
