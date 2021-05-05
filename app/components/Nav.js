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
        <ul className='nav-ul'>
          <li
            className='nav-li'
            key={'Top'}
            onClick={() => this.handleState('Top')}
          >
            <NavLink to='/' exact className='nav-link' activeClassName='active'>
              Top
            </NavLink>
          </li>
          <li
            className='nav-li'
            key={'New'}
            onClick={() => this.handleState('New')}
          >
            <NavLink to='/new' className='nav-link' activeClassName='active'>
              New
            </NavLink>
          </li>
        </ul>
      </React.Fragment>
    );
  }
}
