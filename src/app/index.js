import React from 'react';
import ReactDOM from 'react-dom';
import ImageResults from './ImageResults';
import './css/main.css';

class App extends React.Component{
  constructor(){
    super();
  }
  render(){
    return (
        <ImageResults />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('wrapper') );
