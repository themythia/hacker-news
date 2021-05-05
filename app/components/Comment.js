import React from 'react';
import queryString from 'query-string';
import { fetchComments } from '../utils/api';
import Loading from './Loading';
import Post from './Post';
import { Link } from 'react-router-dom';

export default class Comment extends React.Component {
  state = {
    post: null,
    comments: null,
  };
  componentDidMount() {
    const { id } = queryString.parse(this.props.location.search);
    this.getComments(id);
  }

  getComments = (id) => {
    fetchComments(id)
      .then((data) => {
        this.setState(({ post }) => ({ post: data[0] }));
        return data[1];
      })
      .then((commentData) =>
        this.setState(({ comments }) => ({ comments: commentData }))
      );
  };

  getDate = (num) => {
    const dateObj = new Date(num * 1000);
    return dateObj.toLocaleString();
  };
  render() {
    console.log('state', this.state);
    const { comments, post } = this.state;
    return (
      <div class='comments-div'>
        {this.state.comments === null && <Loading text='Fetching Comments' />}
        {this.state.comments !== null && (
          <Post
            title={post.title}
            url={post.url}
            username={post.by}
            date={this.getDate(post.time)}
            comment={post.descendants}
            postId={post.id}
          />
        )}
        <ul>
          {this.state.comments !== null &&
            comments.map((comment) => {
              return (
                <li key={comment.id} className='comment'>
                  <p className='faded'>
                    {`by `}
                    <span>
                      <Link
                        className='link'
                        to={{ pathname: '/user', search: `?id=${comment.by}` }}
                      >
                        {comment.by}
                      </Link>
                    </span>
                    {` on ${this.getDate(comment.time)}`}
                  </p>
                  <p dangerouslySetInnerHTML={{ __html: comment.text }}></p>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}
