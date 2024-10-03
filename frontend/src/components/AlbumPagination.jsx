import React from "react";

const AlbumPagination = ({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
  totalPages,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Sliding window for visible page numbers
  const maxPageNumbersToShow = 4;
  const halfRange = Math.floor(maxPageNumbersToShow / 2);
  let startPage = Math.max(1, currentPage - halfRange);
  let endPage = Math.min(totalPages, currentPage + halfRange);

  if (currentPage <= halfRange) {
    endPage = Math.min(totalPages, maxPageNumbersToShow);
  } else if (currentPage + halfRange >= totalPages) {
    startPage = Math.max(1, totalPages - maxPageNumbersToShow + 1);
  }

  const visiblePageNumbers = pageNumbers.slice(startPage - 1, endPage);
  return (
    <nav className="flex justify-center mt-4">
      <ul className="inline-flex items-center space-x-2 text-sm md:text-lg">
        {/* Previous Button */}
        <li
          className={`${
            currentPage === 1 ? "pointer-events-none opacity-50" : ""
          }`}
        >
          <button
            onClick={() => paginate(currentPage - 1)}
            className="px-1.5 md:px-3 py-1 md:py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition disabled:opacity-50"
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>

        {/* First Page Button */}
        {startPage > 1 && (
          <li>
            <button
              onClick={() => paginate(1)}
              className={`px-1.5 md:px-3 py-1 md:py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition`}
            >
              1
            </button>
          </li>
        )}

        {/* Ellipsis */}
        {startPage > 2 && <li className="px-3 py-2">...</li>}

        {/* Visible Page Numbers */}
        {visiblePageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`px-1.5 md:px-3 py-1 md:py-2 ${
                currentPage === number
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              } rounded-md transition`}
            >
              {number}
            </button>
          </li>
        ))}

        {/* Ellipsis */}
        {endPage < totalPages - 1 && (
          <li className="px-1.5 md:px-3 py-1 md:py-2">...</li>
        )}

        {/* Last Page Button */}
        {endPage < totalPages && (
          <li>
            <button
              onClick={() => paginate(totalPages)}
              className={`px-1.5 md:px-3 py-1 md:py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition`}
            >
              {totalPages}
            </button>
          </li>
        )}

        {/* Next Button */}
        <li
          className={`${
            currentPage === totalPages ? "pointer-events-none opacity-50" : ""
          }`}
        >
          <button
            onClick={() => paginate(currentPage + 1)}
            className="px-1.5 md:px-3 py-1 md:py-2 bg-gray-200  text-gray-800 rounded-md hover:bg-gray-300 transition disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default AlbumPagination;
