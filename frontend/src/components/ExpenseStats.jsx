function ExpenseStats({data}) {
    return (<div className="grid md:grid-cols-3 gap-6 mb-8">
            <div
                className="
                bg-white
                p-6
                rounded-2xl
                shadow-md
                border-l-4
                border-blue-500
            "
            >
                <h2 className="text-gray-500">Total Expense</h2>

                <p className="text-3xl font-bold mt-2">₹{data?.totalExpense ?? 0}</p>
            </div>

            <div
                className="
                bg-white
                p-6
                rounded-2xl
                shadow-md
                border-l-4
                border-green-500
            "
            >
                <h2 className="text-gray-500">Total Records</h2>

                <p className="text-3xl font-bold mt-2">{data?.totalRecords ?? 0}</p>
            </div>

            <div
                className="
                bg-white
                p-6
                rounded-2xl
                shadow-md
                border-l-4
                border-purple-500
            "
            >
                <h2 className="text-gray-500">Categories</h2>

                <p className="text-3xl font-bold mt-2">
                    {data?.categoryTotals?.length ?? 0}
                </p>
            </div>
        </div>);
}

export default ExpenseStats;
