function ExpensePagination({page, totalPages, onPrevious, onNext}) {
    return (<div
            className="
            flex
            justify-center
            items-center
            gap-4
            mt-6
        "
        >
            <button
                disabled={page <= 1}
                onClick={onPrevious}
                className="
                    bg-gray-200
                    px-4
                    py-2
                    rounded
                    disabled:opacity-50
                "
            >
                Previous
            </button>

            <span>
        Page {page} of {totalPages || 1}
      </span>

            <button
                disabled={page >= (totalPages || 1)}
                onClick={onNext}
                className="
                    bg-gray-200
                    px-4
                    py-2
                    rounded
                    disabled:opacity-50
                "
            >
                Next
            </button>
        </div>);
}

export default ExpensePagination;
