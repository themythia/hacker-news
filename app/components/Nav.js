import React from 'react';
import { NavLink } from 'react-router-dom';
import { ThemeConsumer } from '../contexts/Theme';

export default class Nav extends React.Component {
  state = {
    stories: 'Top',
  };
  handleState = (newState) => {
    this.setState(({ stories }) => ({ stories: newState }));
  };

  render() {
    return (
      <ThemeConsumer>
        {({ theme, toggleTheme }) => (
          <nav>
            <ul className='nav-ul'>
              <li
                className='nav-li'
                key={'Top'}
                onClick={() => this.handleState('Top')}
              >
                <NavLink
                  to='/'
                  exact
                  className={`nav-link ${theme}`}
                  activeClassName='active'
                >
                  Top
                </NavLink>
              </li>
              <li
                className='nav-li'
                key={'New'}
                onClick={() => this.handleState('New')}
              >
                <NavLink
                  to='/new'
                  className={`nav-link ${theme}`}
                  activeClassName='active'
                >
                  New
                </NavLink>
              </li>
            </ul>
            <button className='theme-button' onClick={toggleTheme}>
              {theme === 'light' ? '🕶' : '💡'}
            </button>
          </nav>
        )}
      </ThemeConsumer>
    );
  }
}
