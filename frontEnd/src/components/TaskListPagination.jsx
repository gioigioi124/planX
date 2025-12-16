import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

const TaskListPagination = ({
  handleNext,
  handlePrev,
  handlePageChange,
  page,
  totalPages,
}) => {
  const generatePages = () => {
    const pages = [];
    if (totalPages < 4) {
      // hiện toàn bộ
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i); //thêm số trang vào mảng
      }
    } else {
      if (page <= 2) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (page >= totalPages - 1) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", page, "...", totalPages);
      }
    }
    return pages;
  };

  const pageToShow = generatePages();

  return (
    <div className="flex justify-center">
      <Pagination>
        <PaginationContent>
          {/* về trang trước */}
          <PaginationItem>
            <PaginationPrevious
              onClick={page === 1 ? undefined : handlePrev}
              className={
                (cn("cursor-pointer"),
                page === 1 && "pointer-events-none opacity-50")
              }
            />
          </PaginationItem>

          {/* dấu 3 chấm */}
          {pageToShow.map((p, index) => (
            <PaginationItem key={index}>
              {p === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  isActive={p === page}
                  onClick={() => {
                    if (p !== page) {
                      handlePageChange(p);
                    }
                  }}
                  className="cursor-pointer"
                >
                  {p}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          {/* trang sau */}
          <PaginationItem>
            <PaginationNext
              onClick={page === totalPages ? undefined : handleNext}
              className={
                (cn("cursor-pointer"),
                (page === totalPages || totalPages === 0) &&
                  "pointer-events-none opacity-50")
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default TaskListPagination;
