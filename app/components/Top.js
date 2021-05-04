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
          response.map((story) => <li key={story.id}>{story.title}</li>)
        )}
      </ul>
    );
  }
}
