import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import New from './components/New';
import Top from './components/Top';
import Nav from './components/Nav';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Nav />
        <Switch>
          <Route exact path='/' component={Top} />
          <Route exact path='/new' component={New} />
        </Switch>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
