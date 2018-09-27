import React from 'react';
import PropTypes from 'prop-types';

import './CountrySuggest.css';

class CountrySuggest extends React.Component {
  state = {
    country: '',
    isSuggestionsOpen: false,
  }

  handleInputChange = (e) => {
    const country = e.target.value;
    this.setState({ country, isSuggestionsOpen: true });
    this.props.onCountryChange(country);
  }

  createSuggestionClickHandler = (country) => {
    const handler = function() {
      this.setState({ country, isSuggestionsOpen: false });
    }

    return handler.bind(this);
  }

  render() {
    const data = this.props.data;
    const suggestionList = data.map((countryData) => {
      return (
        <li key={countryData.name} onClick={this.createSuggestionClickHandler(countryData.name)}>
          <span className="flag" style={{ background: `url(${countryData.flag}) 50% 50% no-repeat`, backgroundSize: '30px 20px' }}></span>
          <span className="text">{countryData.name}</span>
        </li>
      );
    });

    return (
      <div className="country-suggest">
        <input type="text" value={this.state.country} onChange={this.handleInputChange} />
        {
          suggestionList.length > 0 && this.state.isSuggestionsOpen &&
          <ul className="suggestions">{suggestionList}</ul>
        }
      </div>
    );
  }
}

CountrySuggest.propTypes = {
  data: PropTypes.array.isRequired,
  onCountryChange: PropTypes.func.isRequired,
};

export default CountrySuggest;