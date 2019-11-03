import React, { Component } from 'react';
import './App.css';

import AutoSuggestion from "./components/autoSuggestion/AutoSuggestion.js";

class App extends Component {
  getSuggestions = (self, input) => {
    fetch(process.env.REACT_APP_PROXY+'/autoSuggestUsers/'+input)
    .then(function(response) {
      if (!response.ok) { throw Error(response.statusText); }
      return response.json();
    }).then(function(data) {
      //it's possible that the results coming back are already obselete, eg the user typed more letters
      //so we want to check that the results are returned for the right input
      if(input === self.state.input) {
        self.setState({suggestions:data});
      }
    }).catch(function(error) {
      console.log(error);
    });
  };


  render() {
    return (
      <div id="App">
        <AutoSuggestion minInputLength={3} maxSuggestions={5} getSuggestions={this.getSuggestions} clickSuggestion={(suggestion) => {console.log(suggestion);}}/>
      </div>
    );
  }
}

export default App;
