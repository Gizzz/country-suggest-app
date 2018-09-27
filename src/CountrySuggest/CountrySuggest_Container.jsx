import React from 'react';
import PropTypes from 'prop-types';
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

    const minCharsToFireRequest = 2;
    if (countryName.length < minCharsToFireRequest) {
      return;
    }

    axios
      .get(`${this.props.apiUrl}/name/${countryName}`)
      .then(response => this.setState({ data: response.data }))
      .catch(console.log);
  }

  render() {
    return (
      <CountrySuggest data={this.state.data} flagField={this.props.flagField} onCountryChange={this.handleCountryChange} />
    );
  }
}

CountrySuggest_Container.propTypes = {
  apiUrl: PropTypes.string.isRequired,
  flagField: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]).isRequired,
};

export default CountrySuggest_Container;
