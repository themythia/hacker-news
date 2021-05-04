import React from 'react';
import { fetchStoryIds } from '../utils/api';
import Loading from './Loading';
export default class Top extends React.Component {
  state = { response: null };
  componentDidMount() {
    this.update();
  }
  update = () => {
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
                <p>
                  <a href={story.url}>{story.title}</a>
                </p>
                <p>
                  {`by ${story.by} on ${dateFormat} with ${story.descendants} comments`}
                </p>
              </li>
            );
          })
        )}
      </ul>
    );
  }
}
