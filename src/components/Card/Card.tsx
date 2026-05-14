import { Link, useSearchParams } from 'react-router-dom';
import type { CardProps } from '../../types';

function Card({ data }: CardProps) {
  const { id, name, height, weight, image, abilities } = data;

  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);

  return (
    <Link to={`/?page=${page}&details=${id}`} className="block h-full min-w-0">
      <article className="flex flex-col bg-white rounded-lg shadow-md h-full w-full min-w-0 overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer text-left">
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
          <p className="font-mono text-md text-gray-600 mb-1">
            height: {height}
          </p>
          <p className="font-mono text-md text-gray-600">weight: {weight}</p>
        </div>
      </article>
    </Link>
  );
}

export default Card;
