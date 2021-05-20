import React from 'react';
import { NavLink } from 'react-router-dom';
import ThemeContext from '../contexts/Theme';

const Nav = ({ toggleTheme }) => {
  const [stories, setStories] = React.useState('Top');
  const theme = React.useContext(ThemeContext);

  const handleState = (newState) => setStories(newState);
  return (
    <nav>
      <ul className='nav-ul'>
        <li className='nav-li' key={'Top'} onClick={() => handleState('Top')}>
          <NavLink
            to='/'
            exact
            className={`nav-link ${theme}`}
            activeClassName='active'
          >
            Top
          </NavLink>
        </li>
        <li className='nav-li' key={'New'} onClick={() => handleState('New')}>
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
  );
};
export default Nav;
