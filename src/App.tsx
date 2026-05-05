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
    isLoading: false,
  };

  componentDidMount(): void {
    this.fetchData(this.state.savedQuery);
  }

  fetchData = async (searchQuery: string) => {
    this.setState({
      isLoading: true,
    })
    try {
      const data = await fetchPokemonList(searchQuery, 25, 0);

      if (!data) {
        throw new Error('Failed to fetch data');
      }

      setTimeout(() => {
        this.setState({
          isLoading: false,
          pokemons: data,
        });
      }, 500);
      return data;
    } catch (error) {
      console.error(`${error}`);
    }
  };

  handleSearch = (searchQuery: string) => {
    const trimmedSearch = searchQuery.trim();
    const previousSearch = this.state.savedQuery;

    if (trimmedSearch !== previousSearch) {
      localStorage.setItem('ann-sm-pokemons', trimmedSearch);

      this.setState({ savedQuery: trimmedSearch }, () => {
        this.fetchData(trimmedSearch);
      });
    }
  };

  render() {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Search
          initialValue={this.state.savedQuery}
          onSearch={this.handleSearch}
        />
        <main className="flex flex-1 items-center justify-center mx-auto px-4 py-8">
          <CardList pokemons={this.state.pokemons} isLoading={this.state.isLoading}/>
        </main>
      </div>
    );
  }
}

export default App;
