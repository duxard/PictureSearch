import React from 'react';
import ReactDOM from 'react-dom';
import makeGallery from './makeGallery';
import GoogleImages from 'google-images';

const API_KEY = 'AIzaSyCyVMf4oJ9_YRn_ue3DrnWLLWOPlqDSaOU';
const CSE_ID = '015311017377742702038:kouiw133nki';
const client = new GoogleImages(CSE_ID, API_KEY);

export default class ImageResults extends React.Component{
  constructor(){
    super();
    this.state = {
      columns: 5,
      start: 0
    };
    this.loadMore = this.loadMore.bind(this);
  }

  loadMore(){
    this.componentDidMount();
  }

  componentDidMount(){
    client.search('flowers', {start: this.state.start})
      .then(result => {
        result = result.map(item => item.url);
        return {arr: result, columns: this.state.columns}
      })
      .then(makeGallery)
      .then(htmlString => {
        this.targetDiv.innerHTML += htmlString;
      })
      .catch(e => console.log(e));

      var newVal = this.state.start;
      newVal += 11;
      this.setState({start: newVal});
  }

  render(){
    return (
      <div>
        <button onClick={this.loadMore}>More</button>
        <div id="container" ref={input => this.targetDiv = input}></div>
      </div>
    );
  }
}
