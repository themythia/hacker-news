import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loading from './components/Loading';
import Top from './components/Top';
import Nav from './components/Nav';
import User from './components/User';
import Comment from './components/Comment';
import { ThemeProvider } from './contexts/Theme';

const App = () => {
  const [theme, setTheme] = React.useState('light');
  const toggleTheme = () => {
    setTheme((theme) => (theme === 'light' ? 'dark' : 'light'));
  };
  return (
    <Router>
      <ThemeProvider value={theme}>
        <div className={theme}>
          <div className='container'>
            <Nav toggleTheme={toggleTheme} />
            <React.Suspense fallback={<Loading />}>
              <Switch>
                <Route exact path='/' render={() => <Top type='top' />} />
                <Route exact path='/new' render={() => <Top type='new' />} />
                <Route path='/user' component={User} />
                <Route path='/post' component={Comment} />
              </Switch>
            </React.Suspense>
          </div>
        </div>
      </ThemeProvider>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
