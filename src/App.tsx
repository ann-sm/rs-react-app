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
  }

  componentDidMount(): void {
    this.fetchData(this.state.savedQuery);
  }

  fetchData = async (searchQuery: string) => {
    try {
      const data = await fetchPokemonList(searchQuery, 20, 0);

      if (!data) {
        throw new Error('Failed to fetch data');
      }

      this.setState({
        pokemons: data,
      })
      return data;

    } catch (error) {
      console.error(`${error}`);
    }
  }

  handleSearch = (searchQuery: string) => {
    const newQuery = searchQuery.trim();
    localStorage.setItem('ann-sm-pokemons', newQuery);
    this.fetchData(newQuery);
  }

  render() {
    return (
      <>
        <Search initialValue={this.state.savedQuery} onSearch={this.handleSearch}/>
        <main>
          <CardList pokemons={this.state.pokemons}/>
        </main>
      </>
    )
  }
}

export default App;
