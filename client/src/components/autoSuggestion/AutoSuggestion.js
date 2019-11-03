import React, { Component } from 'react';
import PropTypes from 'prop-types';

import "./autoSuggestion.css";

export default class AutoSuggestion extends Component {
  state = {
    input: "",
    suggestions: []
  }

  changeInput(e) {
    const input = e.target.value;
    this.setState({input: input});

    if(input.length >= this.props.minInputLength) {
      this.props.getSuggestions(this,input);
    }
    else {
      this.setState({suggestions: []});
    }
  }

  //convert str into HTML text where all instances of this.state.input are bolded (case insensitive)
  boldInput(str) {
    if(typeof str === "string") {
      let input = this.state.input; //get the current state input
      let pieces = []; //will eventually hold str broken up into substrings
      let index = 0; //the index in str where input is found
      let pos = 0; //our current search position in str

      //search for all instances of input in str
      //while there are still instances of input in str (case insensitive)
      while((index = str.toLowerCase().indexOf(input.toLowerCase(), pos)) >= 0) {
        //if there was other text before this instance of input, push that text
        if(pos !== index) {
          pieces.push(str.substr(pos, index - pos));
        }
        pieces.push(str.substr(index, input.length)) //push this instance of input
        pos = index + input.length //move the position
      }
      //if we haven't gotten to the end of the string yet, push what's left
      if(pos < str.length) {
        pieces.push(str.substr(pos));
      }

      //convert this array of strings into bolded or non bolded HTML
      return pieces.map((p,i) =>
        <React.Fragment key={i}>
          {p.toLowerCase()===input.toLowerCase() ? (<strong>{p}</strong>): p}
        </React.Fragment>
      );
    }
  }

  render() {
    return (
      <form style={{"width":"100%"}}>
        <div>
          <input value={this.state.input} onChange={e => this.changeInput(e)} type="text" placeholder="Search..." />
          <div className="autoSuggestion">
            {this.state.suggestions.slice(0,this.props.maxSuggestions).map((suggestion,i) =>
              <div key={i} className="suggestion" onClick={() => this.props.clickSuggestion(suggestion)}>
                {this.boldInput(suggestion.name)}
              </div>
            )}
          </div>
        </div>
      </form>
    );
  }
}

AutoSuggestion.propTypes = {
  minInputLength: PropTypes.number.isRequired, //minimum length of search string before firing getSuggestions()
  maxSuggestions: PropTypes.number.isRequired, //maximum number of suggestions to show
  getSuggestions: PropTypes.func.isRequired, //function to get new suggestions when the user types
  clickSuggestion: PropTypes.func.isRequired, //function to run when a user clicks a suggestion, ex page redirect
};
