import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import CountrySuggest_Container from './CountrySuggest/CountrySuggest_Container'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <CountrySuggest_Container />
      </div>
    );
  }
}

export default App;

/* eslint react/jsx-pascal-case: off */
