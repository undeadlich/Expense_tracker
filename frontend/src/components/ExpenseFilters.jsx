function ExpenseFilters({
                            search, category, sort, fromDate, toDate, setSearchParams,
                        }) {
    return (<div
            className="
            bg-white
            rounded-3xl
            shadow-lg
            p-6
            mb-8
        "
        >
            <h2
                className="
                text-xl
                font-bold
                mb-5
            "
            >
                Filters
            </h2>

            <div
                className="
                grid
                md:grid-cols-3
                gap-4
            "
            >
                <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setSearchParams({
                        search, category, sort, fromDate: e.target.value, toDate, page: 1,
                    })}
                    className="
                        border
                        p-3
                        rounded-xl
                    "
                />

                <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setSearchParams({
                        search, category, sort, fromDate, toDate: e.target.value, page: 1,
                    })}
                    className="
                        border
                        p-3
                        rounded-xl
                    "
                />

                <input
                    type="text"
                    placeholder="Search description..."
                    value={search}
                    onChange={(e) => setSearchParams({
                        search: e.target.value, category, sort, fromDate, toDate, page: 1,
                    })}
                    className="
                        border
                        p-3
                        rounded-xl
                    "
                />

                <select
                    value={category}
                    onChange={(e) => setSearchParams({
                        search, category: e.target.value, sort, fromDate, toDate, page: 1,
                    })}
                    className="
                        border
                        p-3
                        rounded-xl
                    "
                >
                    <option value="">All Categories</option>

                    <option value="FOOD">FOOD</option>

                    <option value="TRANSPORT">TRANSPORT</option>

                    <option value="SHOPPING">SHOPPING</option>

                    <option value="ENTERTAINMENT">ENTERTAINMENT</option>

                    <option value="HEALTH">HEALTH</option>

                    <option value="EDUCATION">EDUCATION</option>

                    <option value="BILLS">BILLS</option>

                    <option value="TRAVEL">TRAVEL</option>

                    <option value="OTHER">OTHER</option>
                </select>

                <select
                    value={sort}
                    onChange={(e) => setSearchParams({
                        search, category, sort: e.target.value, fromDate, toDate, page: 1,
                    })}
                    className="
                        border
                        p-3
                        rounded-xl
                    "
                >
                    <option value="">Default</option>

                    <option value="amount_asc">Amount ↑</option>

                    <option value="amount_desc">Amount ↓</option>

                    <option value="date_asc">Date ↑</option>

                    <option value="date_desc">Date ↓</option>
                </select>

                <button
                    onClick={() => setSearchParams({})}
                    className="
                        bg-red-500
                        hover:bg-red-600
                        text-white
                        rounded-xl
                        px-4
                        py-2
                    "
                >
                    Clear Filters
                </button>
            </div>
        </div>);
}

export default ExpenseFilters;
