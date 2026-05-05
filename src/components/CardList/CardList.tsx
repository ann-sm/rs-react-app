import { Component } from 'react';
import Card from '../Card/Card';
import type { CardListProps } from '../../types';

class CardList extends Component<CardListProps> {
  render() {
    const { pokemons } = this.props;
    return (
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6'>
        {pokemons.map((item) => {
          return <Card key={item.id} data={item} />;
        })}
      </div>
    );
  }
}

export default CardList;
