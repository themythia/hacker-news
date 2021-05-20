import React from 'react';
import queryString from 'query-string';
import { fetchUser, listItems } from '../utils/api';
import Loading from './Loading';
import Post from './Post';

const User = ({ location }) => {
  const { id } = queryString.parse(location.search);
  const [userPosts, setUserPosts] = React.useState(null);
  const [userData, setUserData] = React.useState({
    about: null,
    created: null,
    id: null,
    karma: null,
  });

  React.useEffect(() => {
    fetchUser(id)
      .then((data) => {
        setUserData((userData) => ({
          about: data[0].about,
          created: data[0].created,
          id: data[0].id,
          karma: data[0].karma,
        }));
        return data[1];
      })
      .then((posts) => setUserPosts(posts))
      .catch((error) => console.warn(error));
  }, [id]);

  const getDate = (num) => {
    const dateObj = new Date(num * 1000);
    return dateObj.toLocaleString();
  };

  return (
    <React.Fragment>
      {userData === null && userPosts === null ? (
        <Loading text='Fetching User Data' />
      ) : (
        <div>
          <h1>{userData.id}</h1>
          <p className='faded'>
            joined <b>{getDate(userData.created)}</b> has{' '}
            <b>{userData.karma}</b> karma
          </p>
          <p dangerouslySetInnerHTML={{ __html: userData.about }} />
        </div>
      )}
      <h2>Posts</h2>
      <ul>
        {userPosts !== null &&
          userPosts.map((story) => {
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
export default User;
