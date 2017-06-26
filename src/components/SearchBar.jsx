import React from 'react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.onInputSubmit = this.onInputSubmit.bind(this);
  }

  onInputSubmit() {
    this.props.onInputSubmit(this.refs.term.value);
  }

  render() {
    return (
        <div className="search">
          <input type="text" ref="term" placeholder="Enter text to search for gifs!"/><br/>
          <input type="submit" onClick={this.onInputSubmit}/>
        </div>
    );
  }
}

export default SearchBar;
