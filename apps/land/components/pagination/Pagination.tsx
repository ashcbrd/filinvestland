import { useEffect, useState } from "react";
import ChevronLeft from "../svg/ChevronLeft";
import ChevronRight from "../svg/ChevronRight";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setPage: any;
  size?: number;
  action?: any
}

const Pagination = (props: PaginationProps) => {
  const currentPage = props.currentPage;
  const totalPages = props.totalPages;

  const [max, setMax] = useState(1);
  const [min, setMin] = useState(10);
  const PAGE_LIMIT = props?.size || 10;

  const pages = Array<number>();
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  useEffect(() => {
    let half = PAGE_LIMIT / 2;

    let max =
      currentPage + (currentPage < half ? PAGE_LIMIT - currentPage : half);
    if (max > totalPages) max = totalPages;
    setMax(max);

    let min =
      currentPage -
      (currentPage > totalPages - half
        ? PAGE_LIMIT - (totalPages - currentPage)
        : half);
    if (min < 0) min = 0;
    setMin(min);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  const pageNumbers = pages.map((page) => {
    if (page <= max && page > min) {
      return (
        <li
          key={page}
          onClick={() => { props.setPage(page); props.action && props.action(page) }}
          className={`${currentPage === page
              ? "bg-dark-cornflower-blue text-white"
              : "border-dark-cornflower-blue text-dark-cornflower-blue border-[1px]"
            } cursor-pointer px-3 py-[5px]`}
        >
          {page}
        </li>
      );
    } else {
      return null;
    }
  });

  let pageIncrementEllipses = null;
  if (pages.length > max) {
    pageIncrementEllipses = (
      <li className="flex h-8 items-center justify-center">&hellip;</li>
    );
  }

  let pageDecremenEllipses = null;
  if (min >= 1) {
    pageDecremenEllipses = (
      <li className="flex h-8 items-center justify-center">&hellip;</li>
    );
  }

  if (pages.length < 2) return null;

  return (
    <div className="mt-20 flex justify-center">
      <ul className="text-primary-content flex gap-2 text-sm font-semibold">
        <li>
          <button
            onClick={() => { props.setPage(1) }}
            className="hover:text-primary flex h-8 cursor-pointer items-center justify-center disabled:text-gray-400"
          >
            <ChevronLeft color="black" />
          </button>
        </li>
        {pageDecremenEllipses}
        {pageNumbers}
        {pageIncrementEllipses}
        <li>
          <button
            onClick={() => props.setPage(pages.length)}
            className="hover:text-primary flex h-8 cursor-pointer items-center justify-center disabled:text-gray-400"
          >
            <ChevronRight color="black" />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
