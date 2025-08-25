import React from "react";
import usePokemonStore from "../../zustand/useStore";
import "./Pagination.css";

const Pagination = ({ totalCount, itemsPerPage = 30 }) => {
  // Current page state comes from Zustand
  const { currentPage, setCurrentPage } = usePokemonStore();

  // Calculate total pages based on number of items
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  // If only one page exists, no pagination is needed
  if (totalPages <= 1) return null;

  // This array will store page numbers and "..." placeholders
  const pageNumbers = [];

  // Number of pages to show around the current page
  const delta = 2;

  // Generate pagination numbers
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 || // always include the first page
      i === totalPages || // always include the last page
      (i >= currentPage - delta && i <= currentPage + delta) // include pages around current page
    ) {
      pageNumbers.push(i);
    } else {
      // Insert "..." only if the last pushed item is not already "..."
      if (pageNumbers[pageNumbers.length - 1] !== "...") {
        pageNumbers.push("...");
      }
    }
  }

  return (
    <div className="pagination-wrapper">
      {/* Previous button */}
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="page-btn"
      >
        Prev
      </button>

      {/* Page buttons and ellipsis */}
      {pageNumbers.map((num, idx) => {
        if (num === "...") {
          return (
            <span key={idx} className="ellipsis">
              ...
            </span>
          );
        } else {
          return (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`page-btn ${currentPage === num ? "active" : ""}`}
            >
              {num}
            </button>
          );
        }
      })}

      {/* Next button */}
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="page-btn"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
