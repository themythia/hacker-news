import React from 'react';
import queryString from 'query-string';
import { fetchUser, listItems } from '../utils/api';
import Loading from './Loading';
export default class Post extends React.Component {
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

    return <p>selam</p>;
  }
}
