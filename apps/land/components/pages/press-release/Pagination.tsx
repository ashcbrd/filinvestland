"use client";

const Pagination = ({
  data,
  setPageNumber,
}: {
  data: any;
  setPageNumber: any;
}) => {
  const pageNumbers = [];

  if (!data) return null;

  for (let i = 1; i <= data.totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="mb-24 flex justify-center gap-4">
      {pageNumbers.map((pageNumber: number, index: number) => {
        if (
          pageNumber <= 3 ||
          (pageNumber >= data.page - 2 && pageNumber <= data.page + 2) ||
          pageNumber > data.totalPages - 3
        ) {
          return (
            <li
              key={pageNumber}
              className={`page-item ${
                data.page === pageNumber ? "active" : ""
              }`}
            >
              <div
                onClick={() => setPageNumber(index + 1)}
                className={`${
                  index === data.page - 1
                    ? "bg-dark-cornflower-blue text-white"
                    : "border-dark-cornflower-blue text-dark-cornflower-blue border-[1px]"
                } cursor-pointer px-3 py-[5px]`}
                key={index}
              >
                {pageNumber}
              </div>
            </li>
          );
        } else if (pageNumber === 4 || pageNumber === data.totalPages - 2) {
          return (
            <li key={pageNumber} className="page-item disabled">
              <span className="page-link">...</span>
            </li>
          );
        } else {
          return null;
        }
      })}
    </ul>
  );
};

export default Pagination;
