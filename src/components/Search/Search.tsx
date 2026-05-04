import { Component } from 'react';
import type { SearchProps, SearchState } from '../../types';

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {searchQuery: props.initialValue}
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchQuery: event.target.value,
    })
  }

  handleInputSubmit = () => {
    const inputValue = this.state.searchQuery;
    localStorage.setItem('ann-sm-pokemons', inputValue);
    this.props.onSearch(this.state.searchQuery);
  }
  
  render() {
    return (
      <header>
        <h1>Pokemons</h1>
        <form onSubmit={(event: React.SubmitEvent<HTMLFormElement>) => {
          event.preventDefault();
          this.handleInputSubmit();
        }}>
          <input type='search' value={this.state.searchQuery} onChange={this.handleInputChange}></input>
          <button>Search</button>
        </form>
      </header>
    )
  }
}

export default Search;