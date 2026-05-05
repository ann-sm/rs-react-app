import { Component } from 'react';
import type { SearchProps, SearchState } from '../../types';

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = { searchQuery: props.initialValue };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchQuery: event.target.value,
    });
  };

  handleInputSubmit = () => {
    const inputValue = this.state.searchQuery;
    localStorage.setItem('ann-sm-pokemons', inputValue);
    this.props.onSearch(this.state.searchQuery);
  };

  render() {
    return (
      <header className='bg-teal-700 shadow-lg'>
        <div className='container mx-auto px-4 py-6'>          
          <h1 className='text-3xl font-black text-yellow-400 uppercase text-center mb-6 tracking-wider [text-shadow:2px_2px_0_rgb(185_28_28)]'>PokéSearch</h1>
          <form
            onSubmit={(event: React.SubmitEvent<HTMLFormElement>) => {
              event.preventDefault();
              this.handleInputSubmit();
            }}
            className='max-w-2xl mx-auto flex'
          >
            <input
              type="search"
              name='search'
              value={this.state.searchQuery}
              onChange={this.handleInputChange}
              placeholder='Search...'
              className='flex-1 px-4 py-3 rounded-bl-lg rounded-tl-lg bg-white border-2 border-transparent focus:border-yellow-400 focus:outline-none text-gray-800 placeholder-gray-400'
            ></input>
            <button type='submit' className='bg-yellow-500 text-white font-mono px-6 py-3 rounded-br-lg rounded-tr-lg font-semibold hover:bg-yellow-400 transition-colors shadow-md cursor-pointer'>Search</button>
          </form>
        </div>
      </header>
    );
  }
}

export default Search;
