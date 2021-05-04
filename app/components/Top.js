import React from 'react';
import { fetchStoryIds } from '../utils/api';
import Loading from './Loading';
import Post from './Post';
export default class Top extends React.Component {
  state = { response: null };
  componentDidMount() {
    this.handleUpdate();
  }
  handleUpdate = () => {
    fetchStoryIds('top').then((data) =>
      this.setState(({ response }) => ({ response: data }))
    );
  };

  render() {
    const { response } = this.state;
    return (
      <ul>
        {response === null ? (
          <Loading />
        ) : (
          response.map((story) => {
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
          })
        )}
      </ul>
    );
  }
}
