import { hasSelectionSupport } from '@testing-library/user-event/dist/utils';
import React, { Component } from 'react';
import { useState, useEffect } from "react";
import Searchweather from './SearchWeather';
import Autocomplete from 'react-autocomplete';
import './AutocompleteComponent.css';
 
import { getCountry, matchCountry } from './dataService';
 
 
class AutocompleteComponent extends Component {
  state = { value: '' };
 

  render() {
    return (
        
            <Autocomplete
              
              value={ this.state.value }
              inputProps={{ id: 'states-autocomplete' }}
              wrapperStyle={{ position: 'relative', display: 'inline-block' }}
              items={ getCountry() }
              getItemValue={ item => item.name }
              shouldItemRender={ matchCountry }
              onChange={(event, value) => this.setState({ value }) }
              onSelect={ value => this.setState({ value }) }
              onSubmit={(e)=>hasSelectionSupport(e.target.value)}
              renderMenu={ children => (
                <div className = "autocomplete-menu">
                  { children }
                </div>
              )}
              renderItem={ (item, isHighlighted) => (
                <div
                  className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
                  key={ item.abbr } >
                  { item.name }
                </div>
              )}
            />
    );
  }
}
 
export default AutocompleteComponent;