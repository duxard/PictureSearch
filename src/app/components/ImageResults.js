import React from 'react';
import ReactDOM from 'react-dom';
import makeGallery from './makeGallery';
import GoogleImages from 'google-images';
import { Link } from 'react-router-dom';

const API_KEY = 'AIzaSyCyVMf4oJ9_YRn_ue3DrnWLLWOPlqDSaOU';
const CSE_ID = '015311017377742702038:kouiw133nki';
const client = new GoogleImages(CSE_ID, API_KEY);

function fillEmptyCells(params){
  var inputArray = params.arr;
  params.loader.css("visibility", "hidden");
  if(this.state.residue){
    var length = this.state.residue,
        addHtml = "";
    for(var i=0; i<length; i++){
      addHtml += '<div class="' + this.state.classList + '"><img src="' + inputArray[i] + '" alt="pic"></div>'
    }
    document.querySelector('.row:last-child').insertAdjacentHTML('beforeEnd', addHtml);
    inputArray = inputArray.slice(length);
  }
  return Promise.resolve({arr: inputArray, columns: this.state.columns});
}

function showLoader(params){
  params.loader.css("visibility", "visible");
  return Promise.resolve(params);
}

export default class ImageResults extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      columns: this.props.paramsFromURL.match.params.cols,
      searchigFor: this.props.paramsFromURL.match.params.term,
      start: 0,
      residue: 0,
      classList: "",
      firstLaunch: true
    };
    this.loadMore = this.loadMore.bind(this);
  }

  loadMore(){
    this.componentDidMount();
  }

  componentDidMount(){
    if(this.state.firstLaunch){
      this.loader = $('#loader');
      this.loader.css({
        'position' : 'absolute',
        'left' : '50%',
        'top' : '50%',
        'margin-left' : function() {return -$(this).outerWidth()/2},
        'margin-top' : function() {return -$(this).outerHeight()/2}
      });
      this.setState({firstLaunch: false});
    }else{
      this.loader = $('#loader');
      this.loader.css({
        'position' : 'absolute',
        'left' : '50%',
        'bottom' : '5%',
        'margin-left' : function() {return -$(this).outerWidth()/2},
        'margin-top' : function() {return -$(this).outerHeight()/2}
      });
    }

    client.search(this.state.searchigFor, {start: this.state.start})
      .then(result => {
        result = result.map(item => item.url);
        return {arr: result, columns: this.state.columns, loader: this.loader}
      })
      .then(showLoader)
      .then(fillEmptyCells.bind(this))
      .then(makeGallery)
      .then(result => {
        this.targetDiv.innerHTML += result.htmlString;
        this.setState({residue: result.residue, classList: result.classList});
        document.getElementById('moreBtn').style.display = "block";
      })
      .catch(e => console.log(e));

      var newVal = this.state.start;
      newVal += 11;
      this.setState({start: newVal});
  }

  render(){
    return (
      <div>
        <div id="back">
          <Link to="/" />
        </div>
        <div id="loader"></div>
        <div id="container" ref={input => this.targetDiv = input}></div>
        <div id="more">
          <button id="moreBtn" onClick={this.loadMore}>More</button>
        </div>
      </div>
    );
  }
}
