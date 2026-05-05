import { Component } from 'react';
import './App.css';
import CardList from './components/CardList/CardList';
import type { AppState } from './types';
import { fetchPokemonList } from './services/api';
import Search from './components/Search/Search';

class App extends Component {
  state: AppState = {
    pokemons: [],
    savedQuery: localStorage.getItem('ann-sm-pokemons') || '',
  };

  componentDidMount(): void {
    this.fetchData(this.state.savedQuery);
  }

  fetchData = async (searchQuery: string) => {
    try {
      const data = await fetchPokemonList(searchQuery, 25, 0);

      if (!data) {
        throw new Error('Failed to fetch data');
      }

      this.setState({
        pokemons: data,
      });
      return data;
    } catch (error) {
      console.error(`${error}`);
    }
  };

  handleSearch = (searchQuery: string) => {
    const newQuery = searchQuery.trim();
    localStorage.setItem('ann-sm-pokemons', newQuery);
    this.fetchData(newQuery);
  };

  render() {
    return (
      <div className='min-h-screen bg-gray-100'>
        <Search
          initialValue={this.state.savedQuery}
          onSearch={this.handleSearch}
        />
        <main className='container mx-auto px-4 py-8'>
          <CardList pokemons={this.state.pokemons} />
        </main>
      </div>
    );
  }
}

export default App;
