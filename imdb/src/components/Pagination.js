function Pagination({ page, decreasePageNo, increasePageNo, resetPageNo }) {
  return (
    <div className="flex justify-center p-4 mt-8 items-center bg-gray-400">
      <div onClick={decreasePageNo} className="px-8 border-2">
        Previous
      </div>
      <div className="px-8 font-bold">{page}</div>
      <div onClick={increasePageNo} className="px-8 border-2">
        Next
      </div>
      <div onClick={resetPageNo} className="px-8 border-2">
        Reset
      </div>
    </div>
  );
}

export default Pagination;