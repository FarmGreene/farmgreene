"use client";

const range = (start: number, end: number) =>
  Array.from({ length: end - start }, (_, i) => start + i);

export default function paginationRange(
  totalPage: number,
  page: number,
  siblings: number,
) {
  const totalPageNoInArray = 5 + siblings;
  if (totalPageNoInArray >= totalPage) {
    return range(1, totalPage + 1);
  }

  const leftSiblingsIndex = Math.max(page - siblings, 1);
  const rightSiblingsIndex = Math.min(page + siblings, totalPage);

  const showLeftDots = leftSiblingsIndex > 2;
  const showRightDots = rightSiblingsIndex < totalPage - 2;

  if (!showLeftDots && showRightDots) {
    const leftItemsCount = 3 + 2 * siblings;
    return [...range(1, leftItemsCount + 1), "...", totalPage];
  } else if (showLeftDots && !showRightDots) {
    const rightItemsCount = 3 + 2 * siblings;
    return [1, "...", ...range(totalPage - rightItemsCount + 1, totalPage + 1)];
  } else {
    return [
      1,
      "...",
      ...range(leftSiblingsIndex, rightSiblingsIndex + 1),
      "...",
      totalPage,
    ];
  }
}
