"use client";
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import paginationRange from "./range";
import Select from "../customs/custom_select";
import { cn } from "@/lib/utils";

interface IPaginationProps {
  totalLength: number;
  batch: number;
  setBatch: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  className?: string;
}

interface IPagesProps {
  totalLength: number;
  batch: number;
  setBatch: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
}

const Pages: React.FC<IPagesProps> = ({
  totalLength,
  batch,
  setBatch,
  limit,
}) => {
  const totalPages = Math.ceil(totalLength / limit);
  const pagesNumber = paginationRange(totalPages, batch, 1);

  const handlePageClick = (pageNumber: string | number) => {
    if (pageNumber === "..." || pageNumber === batch) {
      return;
    }
    setBatch(Number(pageNumber));
  };

  return (
    <ul className="list-none items-center hidden md:flex gap-2">
      {pagesNumber?.map((number: string | number, idx: number) => {
        const isCurrentPage = batch === number;
        const isEllipsis = number === "...";

        return (
          <li
            key={`page-${idx}-${number}`}
            onClick={() => handlePageClick(number)}
            className={`
              cursor-pointer text-sm min-w-[35px] px-1 h-[35px] 
              flex items-center justify-center border text-gray-500 
              rounded-lg transition-colors duration-200
              ${
                isCurrentPage
                  ? "bg-gray-100 dark:bg-gray-600 border-none text-gray-900 dark:text-white"
                  : "hover:bg-gray-50 dark:hover:bg-gray-700"
              }
              ${isEllipsis ? "cursor-default hover:bg-transparent" : ""}
            `}
            aria-label={isEllipsis ? undefined : `Go to page ${number}`}
            role={isEllipsis ? "presentation" : "button"}
            tabIndex={isEllipsis ? -1 : 0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handlePageClick(number);
              }
            }}
          >
            {number}
          </li>
        );
      })}
    </ul>
  );
};

const Pagination: React.FC<IPaginationProps> = ({
  totalLength,
  batch,
  setBatch,
  limit,
  setLimit,
  className,
}) => {
  const totalPages = Math.ceil(totalLength / limit);
  const startItem = (batch - 1) * limit + 1;
  const endItem = Math.min(batch * limit, totalLength);
  const hasPrevious = batch > 1;
  const hasNext = batch < totalPages;

  const handlePrevious = () => {
    if (hasPrevious) {
      setBatch(batch - 1);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      setBatch(batch + 1);
    }
  };

  const handleLimitChange = (newLimit: string) => {
    const limitNum = Number(newLimit);
    setLimit(limitNum);

    // Adjust current page if it would exceed the new total pages
    const newTotalPages = Math.ceil(totalLength / limitNum);
    if (batch > newTotalPages) {
      setBatch(newTotalPages || 1);
    }
  };

  // Don't render pagination if there are no items
  if (totalLength === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex items-center justify-between w-full h-[60px] gap-4 relative z-10",
        className,
      )}
    >
      {/* Results info */}
      <div className="text-sm text-gray-500">
        {totalLength > 0 ? (
          <span>
            Showing {startItem}-{endItem} of {totalLength} results
          </span>
        ) : (
          <span>No results found</span>
        )}
      </div>

      {/* Navigation controls */}
      <div className="flex items-center gap-4 px-4 h-[60px] rounded-3xl">
        <button
          className={`
            outline-none h-[35px] w-[35px] flex items-center justify-center gap-2 
            transition-colors duration-200 rounded-md px-2 border
            ${
              hasPrevious
                ? "cursor-pointer text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                : "cursor-not-allowed text-gray-300 dark:text-gray-600"
            }
          `}
          onClick={handlePrevious}
          disabled={!hasPrevious}
          aria-label="Previous page"
        >
          <ChevronLeft size={20} />
        </button>

        <Pages
          totalLength={totalLength}
          setBatch={setBatch}
          batch={batch}
          limit={limit}
        />

        <button
          className={`
            outline-none h-[35px] w-[35px] border flex gap-2 items-center justify-center 
            transition-colors duration-200 rounded-md px-2
            ${
              hasNext
                ? "cursor-pointer text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                : "cursor-not-allowed text-gray-300 dark:text-gray-600"
            }
          `}
          onClick={handleNext}
          disabled={!hasNext}
          aria-label="Next page"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Items per page selector */}
      <div className="hidden md:block shrink-0">
        <Select
          triggerText="Per page"
          content={[
            { label: "5/page", value: "5" },
            { label: "10/page", value: "10" },
            { label: "16/page", value: "16" },
            { label: "20/page", value: "20" },
            { label: "25/page", value: "25" },
            { label: "30/page", value: "30" },
          ]}
          variant="outline"
          itemClassName="px-2"
          onChange={handleLimitChange}
          value={limit.toString()}
          position="popper"
        />
      </div>
    </div>
  );
};

export default Pagination;
