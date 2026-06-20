'use client';

import { redirect, useSearchParams } from 'next/navigation';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const searchParams = useSearchParams();
  const searchValue = searchParams?.get('search') || '';

  const handleNavigation = (page: number) => {
    if (searchValue) {
      redirect(`/?search=${encodeURIComponent(searchValue)}&page=${page}`);
    } else {
      redirect(`/?page=${page}`);
    }
  };

  return (
    <nav className="mt-6">
      <button
        onClick={() => handleNavigation(currentPage - 1)}
        className="px-4 py-2 bg-teal-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-700 transition-colors font-mono font-bold hover:cursor-pointer"
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      <span className="px-4 font-mono dark:text-gray-300">{`${currentPage} of ${totalPages}`}</span>
      <button
        onClick={() => handleNavigation(currentPage + 1)}
        className="px-4 py-2  bg-teal-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-700 transition-colors font-mono font-bold hover:cursor-pointer"
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </nav>
  );
};

export default Pagination;
