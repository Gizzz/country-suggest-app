import React from 'react';
import PropTypes from 'prop-types';

import './CountrySuggest.css';

class CountrySuggest extends React.Component {
  initialState = {
    country: '',
    isSuggestionsOpen: false,
    activeSuggestionIndex: null,
  }

  state = this.initialState

  handleInputChange = (e) => {
    const country = e.target.value;
    this.setState({ country, isSuggestionsOpen: true });
    this.props.onCountryChange(country);
  }

  handleInputKeydown = (e) => {
    const data = this.props.data;
    if (data.length === 0) {
      return;
    }

    // prevent cursor jumping on input when navigating with arrows
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
    }

    if (e.key === 'ArrowDown') {
      if (this.state.activeSuggestionIndex === null) {
        this.setState({ activeSuggestionIndex: 0 });
      } else if ((this.state.activeSuggestionIndex + 1) < data.length) {
        this.setState((state) => ({ activeSuggestionIndex: state.activeSuggestionIndex + 1 }));
      }
    } else if (e.key === 'ArrowUp') {
      if (this.state.activeSuggestionIndex === null) {
        this.setState({ activeSuggestionIndex: data.length - 1 });
      } else if ((this.state.activeSuggestionIndex - 1) >= 0) {
        this.setState((state) => ({ activeSuggestionIndex: state.activeSuggestionIndex - 1 }));
      }
    } else if (e.key === 'Enter') {
      const activeSuggestionIndex = this.state.activeSuggestionIndex;
      if (activeSuggestionIndex !== null) {
        this.setState({
          ...this.initialState,
          country: data[activeSuggestionIndex].name,
        });
      }
    }
  }

  createSuggestionClickHandler = (country) => {
    const handler = function() {
      this.setState({
        ...this.initialState,
        country,
      });
    }

    return handler.bind(this);
  }

  render() {
    const data = this.props.data;
    const suggestionList = data.map((countryData, index) => {
      const flagField = this.props.flagField;
      const flagUrl = typeof flagField === 'string' ? countryData[flagField] : flagField(countryData);
      const flagStyles = {
        background: `url(${flagUrl}) 50% 50% no-repeat`,
        backgroundSize: '30px 20px'
      };

      return (
        <li
          className={index === this.state.activeSuggestionIndex ? 'active' : ''}
          key={countryData.name}
          onClick={this.createSuggestionClickHandler(countryData.name)}
        >
          <span className="flag" style={flagStyles}></span>
          <span className="text">{countryData.name}</span>
        </li>
      );
    });

    return (
      <div className="country-suggest">
        <input type="text" value={this.state.country} onChange={this.handleInputChange} onKeyDown={this.handleInputKeydown} />
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
  flagField: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]).isRequired,
  onCountryChange: PropTypes.func.isRequired,
};

export default CountrySuggest;