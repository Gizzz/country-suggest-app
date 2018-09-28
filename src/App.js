import React, { Component } from 'react';

import CountrySuggest_Container from './CountrySuggest/CountrySuggest_Container'

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-CountrySuggest">
          <CountrySuggest_Container apiUrl="https://restcountries.eu/rest/v2" flagField={responseItem => responseItem.flag} />
        </div>
      </div>
    );
  }
}

export default App;

/* eslint react/jsx-pascal-case: off */
