import React from "react";
import usePokemonStore from "../../zustand/useStore";
import "./Pagination.css";

const Pagination = ({ totalCount, itemsPerPage = 30 }) => {
  const { currentPage, setCurrentPage } = usePokemonStore();
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  if (totalPages <= 1) return null; // no pagination needed

  const pageNumbers = []; // we will store page numbers + "..." here

  const delta = 2; // how many pages to show around current page

  // Loop through all pages
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 || // always show first page
      i === totalPages || // always show last page
      (i >= currentPage - delta && i <= currentPage + delta) // pages near current
    ) {
      pageNumbers.push(i);
    } else {
      // check if previous item is not "..." to avoid duplicates
      if (pageNumbers[pageNumbers.length - 1] !== "...") {
        pageNumbers.push("...");
      }
    }
  }

  return (
    <div className="pagination-wrapper">
      {/* Prev button */}
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="page-btn"
      >
        Prev
      </button>

      {/* Page buttons */}
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
