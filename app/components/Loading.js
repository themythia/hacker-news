import React from 'react';

export default class Loading extends React.Component {
  state = {
    content: 'Loading',
  };
  componentDidMount() {
    this.interval = setInterval(() => {
      this.state.content === 'Loading...'
        ? this.setState({ content: 'Loading' })
        : this.setState((state) => ({ content: state.content + '.' }));
    }, 300);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return <p>{this.state.content}</p>;
  }
}
