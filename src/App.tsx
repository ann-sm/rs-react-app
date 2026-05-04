import { Component } from 'react';
import './App.css';
import CardList from './components/CardList/CardList';
import type { AppState } from './types';
import { fetchPokemonList } from './services/api';
import Search from './components/Search/Search';

class App extends Component {
  state: AppState = {
    pokemons: [],
  }

  componentDidMount(): void {
    this.fetchData();
  }

  fetchData = async() => {
    try {
      const data = await fetchPokemonList(20, 10);

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

  render() {
    return (
      <>
        <Search/>
        <main>
          <CardList pokemons={this.state.pokemons}/>
        </main>
      </>
    )
  }
}

export default App;
