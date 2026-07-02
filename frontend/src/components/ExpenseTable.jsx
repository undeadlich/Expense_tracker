import {useNavigate} from "react-router-dom";

function ExpenseTable({expenses, onEdit, onDelete}) {
    const navigate = useNavigate();

    return (<div
            className="
                bg-white
                rounded-2xl
                shadow-lg
                overflow-hidden
            "
        >
            <table className="w-full">
                <thead>
                <tr className="bg-gray-100">
                    <th className="p-4 text-left">Amount</th>

                    <th className="p-4 text-left">Category</th>

                    <th className="p-4 text-left">Description</th>

                    <th className="p-4 text-left">Date</th>

                    <th className="p-4 text-left">Actions</th>
                </tr>
                </thead>

                <tbody>
                {expenses?.length === 0 && (<tr>
                        <td
                            colSpan="5"
                            className="
                                    p-8
                                    text-center
                                    text-gray-500
                                "
                        >
                            No expenses found
                        </td>
                    </tr>)}

                {expenses?.map((expense) => (<tr
                        key={expense.id}
                        className="
                                        border-t
                                        hover:bg-gray-50
                                        transition
                                    "
                    >
                        <td
                            className="
                                            p-4
                                            font-bold
                                            text-green-600
                                        "
                        >
                            ₹{expense.amount}
                        </td>

                        <td className="p-4">
                <span
                    className="
                                                px-3
                                                py-1
                                                rounded-full
                                                text-xs
                                                font-semibold
                                                bg-blue-100
                                                text-blue-700
                                            "
                >
                  {expense.category}
                </span>
                        </td>

                        <td className="p-4">{expense.description}</td>

                        <td className="p-4">
                            {expense.expenseDate?.replace(" IST", "").substring(0, 16)}
                        </td>

                        <td className="p-4">
                            <div className="flex gap-2">
                                <button
                                    onClick={() => navigate(`/expenses/${expense.id}`)}
                                    className="
                                                    bg-indigo-600
                                                    hover:bg-indigo-700
                                                    text-white
                                                    px-3
                                                    py-2
                                                    rounded-lg
                                                    transition
                                                "
                                >
                                    View
                                </button>

                                <button
                                    onClick={() => onEdit(expense)}
                                    className="
                                                    bg-yellow-500
                                                    hover:bg-yellow-600
                                                    text-white
                                                    px-3
                                                    py-2
                                                    rounded-lg
                                                    transition
                                                "
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => onDelete(expense.id)}
                                    className="
                                                    bg-red-500
                                                    hover:bg-red-600
                                                    text-white
                                                    px-3
                                                    py-2
                                                    rounded-lg
                                                    transition
                                                "
                                >
                                    Delete
                                </button>
                            </div>
                        </td>
                    </tr>))}
                </tbody>
            </table>
        </div>);
}

export default ExpenseTable;
