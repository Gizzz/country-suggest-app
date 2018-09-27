import React from 'react';
import axios from 'axios';

import CountrySuggest from './CountrySuggest';

class CountrySuggest_Container extends React.Component {
  initialState = {
    data: [],
  }

  state = this.initialState

  handleCountryChange = (countryInput) => {
    const countryName = countryInput.trim();
    if (countryName === '') {
      this.setState(this.initialState);
      return;
    }

    if (countryName.length < 2) {
      return;
    }

    axios
      .get(`https://restcountries.eu/rest/v2/name/${countryName}`)
      .then(response => this.setState({ data: response.data }))
      .catch(console.log);
  }

  render() {
    return (
      <CountrySuggest data={this.state.data} onCountryChange={this.handleCountryChange} />
    );
  }
}

export default CountrySuggest_Container;
