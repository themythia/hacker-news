import React from 'react';
import queryString from 'query-string';
import { fetchUser, listItems } from '../utils/api';
import Loading from './Loading';
import Post from './Post';
export default class User extends React.Component {
  state = {
    userData: {
      about: null,
      created: null,
      id: null,
      karma: null,
    },
    userPosts: null,
  };
  componentDidMount() {
    const { id } = queryString.parse(this.props.location.search);
    this.getUser(id);
  }

  getUser = (name) => {
    fetchUser(name)
      .then((data) => {
        this.setState(({ userData }) => ({
          userData: {
            about: data[0].about,
            created: data[0].created,
            id: data[0].id,
            karma: data[0].karma,
          },
        }));
        return data[1];
      })
      .then((posts) =>
        this.setState(({ userPosts }) => ({
          userPosts: posts,
        }))
      );
  };

  render() {
    console.log(this.state);
    const { userData, userPosts } = this.state;
    return (
      <ul>
        {userData === null && userPosts === null ? (
          <Loading />
        ) : (
          <div>
            <p dangerouslySetInnerHTML={{ __html: userData.about }} />
            <p>{userData.created}</p>
            <p>{userData.id}</p>
            <p>{userData.karma}</p>
          </div>
        )}
        {userPosts !== null &&
          userPosts.map((story) => {
            const miliseconds = story.time * 1000;
            const dateObj = new Date(miliseconds);
            const dateFormat = dateObj.toLocaleString();
            return (
              <li key={story.id}>
                <Post
                  title={story.title}
                  url={story.url}
                  username={story.by}
                  date={dateFormat}
                  comment={story.descendants}
                />
              </li>
            );
          })}
      </ul>
    );
  }
}
