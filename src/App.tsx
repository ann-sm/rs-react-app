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
    hasError: false,
  };

  componentDidMount(): void {
    this.fetchData(this.state.savedQuery);
  }

  fetchData = async (searchQuery: string) => {
    this.setState({
      isLoading: true,
    });

    const data = await fetchPokemonList(searchQuery, 1);
    setTimeout(() => {
      this.setState({
        isLoading: false,
        pokemons: data,
      });
    }, 500);
    return data;
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
    if (this.state.hasError) {
      throw new Error('Ask Pikachu what we should do...');
    }
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Search
          initialValue={this.state.savedQuery}
          onSearch={this.handleSearch}
        />
        <main className="flex flex-col flex-1 items-center justify-center mx-auto px-4 py-8">
          <CardList
            pokemons={this.state.pokemons}
            isLoading={this.state.isLoading}
          />
          <button
            className="bg-yellow-500 text-white font-mono text-lg px-6 py-3 mt-12 rounded-lg font-semibold hover:bg-yellow-400 transition-colors shadow-md cursor-pointer"
            onClick={() => {
              this.setState({
                hasError: true,
              });
            }}
          >
            Error Button
          </button>
        </main>
      </div>
    );
  }
}

export default App;
