import type { PaginationProps } from '../../types';

function Pagination({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
}: PaginationProps) {
  return (
    <div className="mt-6">
      <button
        className="px-4 py-2 bg-teal-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-700 transition-colors font-mono font-bold hover:cursor-pointer"
        onClick={() => onPrevPage(currentPage)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      <span className="px-4 font-mono">{`${currentPage} of ${totalPages}`}</span>
      <button
        className="px-4 py-2  bg-teal-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-700 transition-colors font-mono font-bold hover:cursor-pointer"
        onClick={() => onNextPage(currentPage)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
}

export default Pagination;
