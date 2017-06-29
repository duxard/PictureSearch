import React from 'react';
import ReactDOM from 'react-dom';
import makeGallery from './makeGallery';
import GoogleImages from 'google-images';

const API_KEY = 'AIzaSyCyVMf4oJ9_YRn_ue3DrnWLLWOPlqDSaOU';
const CSE_ID = '015311017377742702038:kouiw133nki';
const client = new GoogleImages(CSE_ID, API_KEY);

function fillEmptyCells(params){
  var inputArray = params.arr;
  if(this.state.residue){
    var length = this.state.residue,
        addHtml = "";
    for(var i=0; i<length; i++){
      addHtml += '<div class="' + this.state.classList + '"><img src="' + inputArray[i] + '" alt="pic"></div>'
    }
    document.querySelector('.row:last-child').insertAdjacentHTML('beforeEnd', addHtml);
    console.log(inputArray);
    inputArray = inputArray.slice(length);
  }
  return Promise.resolve({arr: inputArray, columns: this.state.columns});
}

export default class ImageResults extends React.Component{
  constructor(){
    super();
    this.state = {
      columns: 4,
      start: 0,
      residue: 0,
      classList: ""
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
      .then(fillEmptyCells.bind(this))
      .then(makeGallery)
      .then(result => {
        this.targetDiv.innerHTML += result.htmlString;
        this.setState({residue: result.residue, classList: result.classList});
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
