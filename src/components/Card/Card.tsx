import type { CardProps } from '../../types';

function Card({ data }: CardProps) {
  const { name, height, weight, image, abilities } = data;

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      <div className="relative pb-[100%] bg-linear-to-br from-teal-50 to-blue-50">
        <img
          src={image}
          className="absolute inset-0 w-full h-full object-contain p-4"
        ></img>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-accent font-bold text-teal-700 capitalize mb-2">
          {name}
        </h3>
        <p className="font-mono text-md font-bold text-gray-600 mb-1">
          {abilities.join(',')}
        </p>
        <p className="font-mono text-md text-gray-600 mb-1">height: {height}</p>
        <p className="font-mono text-md text-gray-600">weight: {weight}</p>
      </div>
    </article>
  );
}

export default Card;
