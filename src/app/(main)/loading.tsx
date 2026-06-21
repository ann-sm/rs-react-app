const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-[58vh] w-full">
      <div
        className="relative h-18 w-18 animate-spin rounded-full border-4 border-black bg-linear-to-b from-red-500 from-50% to-white to-50%"
        aria-label="animate-spin"
      >
        <div className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-black bg-gray-100"></div>
        <div className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 bg-black"></div>
      </div>
    </div>
  );
}

export default Loader;