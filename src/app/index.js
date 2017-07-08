import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import SearchScreen from './components/SearchScreen';
import ImageResults from './components/ImageResults';
import './css/main.css';

class App extends React.Component{
  constructor(){
    super();
  }
  render(){
    return (
      <Router>
        <div>
          <Route exact={true} path="/" render={() => (<SearchScreen/>)} />
          <Route path="/:term/:cols" render={(match) => (<ImageResults paramsFromURL={match} />)} />
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('wrapper') );
