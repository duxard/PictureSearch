import React from 'react';
import ReactDOM from 'react-dom';

export default class SearchScreen extends React.Component{
  constructor(){
    super();
    this.state = {search: "", columns: 1};
    this.validate = this.validate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  validate(event){
    if(!this.state.search){
      event.preventDefault();
      document.getElementById('searchTerm').style.color = "red";
      console.log('error');
    }
  }
  handleChange(event){
    this.setState({search: event.target.value});
  }
  componentDidMount(){
    const that = this;
    $(function(){
      var $search = $('#search'),
          $slider = $('#slider'),
          $sliderValue = $('#sliderValue'),
          $sliderPainter = $('#sliderPainter'),
          $searchTerm = $('#searchTerm');
      $search.css({
          'position' : 'absolute',
          'left' : '50%',
          'top' : '50%',
          'margin-left' : function() {return -$(this).outerWidth()/2},
          'margin-top' : function() {return -$(this).outerHeight()/2}
      });
      $slider.slider({
        min: 1,
        max: 5,
        slide: function(event, ui){
          switch(ui.value){
            case 1:
              $sliderValue.html('1');
              $sliderPainter.css('width','0px');
              that.setState({columns: 1});
              break;
            case 2:
              $sliderValue.html('2');
              $sliderPainter.css('width','43px');
              that.setState({columns: 2});
              break;
            case 3:
              $sliderValue.html('3');
              $sliderPainter.css('width','90px');
              that.setState({columns: 3});
              break;
            case 4:
              $sliderValue.html('4');
              $sliderPainter.css('width','140px');
              that.setState({columns: 4});
              break;
            case 5:
              $sliderValue.html('5');
              $sliderPainter.css('width','195px');
              that.setState({columns: 5});
              break;
          }
        }
      });
    });
  }
  render(){
    return(
      <div id="search">
        <div id="searchField">
          <p className="denomination" id="searchTerm">Search Term: </p>
          <input type="text" id="searchText" value={this.state.search} onChange={this.handleChange}/>
        </div>
        <div id="quantityOfColumns">
          <p className="denomination">Columns: </p>
          <div id="slider-container">
            <div id="slider"></div>
          </div>
          <div id="sliderPainter"></div>
          <p id="sliderValue">1</p>
        </div>
        <div id="searchLink">
          <p><a href={"/"+this.state.search+"/"+this.state.columns} onClick={this.validate}>Search</a></p>
        </div>
      </div>
    );
  }
}
