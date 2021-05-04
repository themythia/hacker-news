import React from 'react';
import { NavLink } from 'react-router-dom';

export default class Nav extends React.Component {
  state = {
    stories: 'Top',
  };
  handleState = (newState) => {
    this.setState(({ stories }) => ({ stories: newState }));
  };

  render() {
    return (
      <React.Fragment>
        <ul>
          <li key={'Top'} onClick={() => this.handleState('Top')}>
            <NavLink to='/' exact>
              Top
            </NavLink>
          </li>
          <li key={'New'} onClick={() => this.handleState('New')}>
            <NavLink to='/new'>New</NavLink>
          </li>
        </ul>
      </React.Fragment>
    );
  }
}
