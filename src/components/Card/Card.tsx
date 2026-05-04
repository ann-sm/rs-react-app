import { Component } from 'react';
import type { CardProps } from '../../types';

class Card extends Component<CardProps> {
  render() {
    const { name, height, image } = this.props.data;

    return (
      <article>
        <h3>{name}</h3>
        <p>{height}</p>
        <img src={image}></img>
      </article>
    );
  }
}

export default Card;