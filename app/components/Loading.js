import React from 'react';

export default class Loading extends React.Component {
  state = {
    content: this.props.text,
  };
  componentDidMount() {
    this.interval = setInterval(() => {
      this.state.content === `${this.props.text}...`
        ? this.setState({ content: this.props.text })
        : this.setState((state) => ({ content: state.content + '.' }));
    }, 300);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return <p className='loading'>{this.state.content}</p>;
  }
}
