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

  getDate = (num) => {
    const dateObj = new Date(num * 1000);
    return dateObj.toLocaleString();
  };

  render() {
    console.log(this.state);
    const { userData, userPosts } = this.state;
    return (
      <React.Fragment>
        {userData === null && userPosts === null ? (
          <Loading text='Fetching User Data' />
        ) : (
          <div>
            <h1>{userData.id}</h1>
            <p className='faded'>
              joined <b>{this.getDate(userData.created)}</b> has{' '}
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
                    date={this.getDate(story.time)}
                    comment={story.descendants}
                    postId={story.id}
                  />
                </li>
              );
            })}
        </ul>
      </React.Fragment>
    );
  }
}
