import React from 'react';
import { fetchStoryIds } from '../utils/api';
export default class New extends React.Component {
  state = {
    response: null,
  };
  componentDidMount() {
    fetchStoryIds('new').then((data) =>
      this.setState(({ response }) => ({ response: data }))
    );
  }
  render() {
    const { response } = this.state;
    return <pre>{JSON.stringify(response, null, 2)}</pre>;
  }
}
