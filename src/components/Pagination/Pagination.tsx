type PaginationProps = {
  currentPage: number;
  totalPages: number;
}

const Pagination = ({
  currentPage,
  totalPages,
}: PaginationProps) => {
  return (
    <nav className="mt-6">
      <button
        className="px-4 py-2 bg-teal-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-700 transition-colors font-mono font-bold hover:cursor-pointer"
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      <span className="px-4 font-mono dark:text-gray-300">{`${currentPage} of ${totalPages}`}</span>
      <button
        className="px-4 py-2  bg-teal-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-700 transition-colors font-mono font-bold hover:cursor-pointer"
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </nav>
  );
}

export default Pagination;
