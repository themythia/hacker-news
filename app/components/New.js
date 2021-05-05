import React from 'react';
import { fetchStoryIds } from '../utils/api';
import Loading from './Loading';
import Post from './Post';

export default class New extends React.Component {
  state = { response: null };
  componentDidMount() {
    this.handleUpdate();
  }
  handleUpdate = () => {
    fetchStoryIds('new').then((data) =>
      this.setState(({ response }) => ({ response: data }))
    );
  };
  getDate = (num) => {
    const dateObj = new Date(num * 1000);
    return dateObj.toLocaleString();
  };
  render() {
    const { response } = this.state;
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
