import "../../cssStyle/Search/Pagination.css";

const Pagination = ({
  page,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="job-pagination">

      {/* Previous */}

      <button
        className="job-pagination-btn"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </button>

      {/* Page Numbers */}

      {pages.map((number) => (
        <button
          key={number}
          className={`job-pagination-number ${
            page === number ? "active" : ""
          }`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}

      {/* Next */}

      <button
        className="job-pagination-btn"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>

    </div>
  );
};

export default Pagination;