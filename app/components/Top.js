import React from 'react';
import { fetchStoryIds } from '../utils/api';
import Loading from './Loading';
import Post from './Post';

const Top = ({ type = 'top' }) => {
  const [response, setResponse] = React.useState(null);

  React.useEffect(() => {
    fetchStoryIds(type).then((data) => setResponse(data));
    return () => setResponse(null);
  }, [type]);

  const getDate = (num) => {
    const dateObj = new Date(num * 1000);
    return dateObj.toLocaleString();
  };

  return (
    <React.Fragment>
      {response === null && <Loading text='Fetching Stories' />}
      <ul>
        {response !== null &&
          response.map((story) => {
            return (
              <li key={story.id}>
                <Post
                  title={story.title}
                  url={story.url}
                  username={story.by}
                  date={getDate(story.time)}
                  comment={story.descendants}
                  postId={story.id}
                />
              </li>
            );
          })}
      </ul>
    </React.Fragment>
  );
};
export default Top;
