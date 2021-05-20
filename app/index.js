import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loading from './components/Loading';
import Nav from './components/Nav';
import { ThemeProvider } from './contexts/Theme';

const Top = React.lazy(() => import('./components/Top'));
const User = React.lazy(() => import('./components/User'));
const Comment = React.lazy(() => import('./components/Comment'));

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
