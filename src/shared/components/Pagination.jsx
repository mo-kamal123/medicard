import { ChevronLeft, ChevronRight } from "lucide-react"

const Pagination = ({ currentPage, totalPages, onPageChange }) => {

  const getPages = () => {
    const pages = []
    const delta = 2
    const start = Math.max(1, currentPage - delta)
    const end = Math.min(totalPages, currentPage + delta)

    if (start > 1) {
      pages.push(1)
      if (start > 2) pages.push("...")
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...")
      pages.push(totalPages)
    }

    return pages
  }

  const btnBase = "flex items-center justify-center w-10 h-10 rounded-xl text-sm font-medium transition-colors"

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${btnBase} text-gray-500 hover:bg-blue-50 hover:text-main disabled:opacity-30 disabled:pointer-events-none`}
      >
        <ChevronLeft size={18} />
      </button>

      {getPages().map((page, idx) =>
        page === "..." ? (
          <span key={`ellipsis-${idx}`} className="w-10 text-center text-sm text-gray-400">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`${btnBase} ${
              page === currentPage
                ? "bg-main text-white shadow-md"
                : "text-gray-600 hover:bg-blue-50 hover:text-main"
            }`}
          >
            {page}  
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${btnBase} text-gray-500 hover:bg-blue-50 hover:text-main disabled:opacity-30 disabled:pointer-events-none`}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  )
}

export default Pagination
