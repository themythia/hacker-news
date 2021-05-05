import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import New from './components/New';
import Top from './components/Top';
import Nav from './components/Nav';
import User from './components/User';
import Comment from './components/Comment';
import { ThemeProvider } from './contexts/Theme';

class App extends React.Component {
  state = {
    theme: 'light',
    toggleTheme: () => {
      this.setState(({ theme }) => ({
        theme: theme === 'light' ? 'dark' : 'light',
      }));
    },
  };
  render() {
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
            <div className='container'>
              <Nav />
              <Switch>
                <Route exact path='/' component={Top} />
                <Route exact path='/new' component={New} />
                <Route path='/user' component={User} />
                <Route path='/post' component={Comment} />
              </Switch>
            </div>
          </div>
        </ThemeProvider>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
