import { Component } from 'react';
import Card from '../Card/Card';
import type { CardListProps } from '../../types';


class CardList extends Component<CardListProps> {
  render() {
    const { pokemons } = this.props;
    return (
      <div>
        {pokemons.map((item) => {
          return (
            <Card key={item.id} data={item} />
        )}
        )}
      </div>
    );
  }
}

export default CardList;