import {useEffect, useState} from "react";

import {useParams, useNavigate} from "react-router-dom";

import Navbar from "../components/Navbar";

import {getExpenseDetails} from "../services/expenseService";

function ExpenseDetails() {
    const {id} = useParams();

    const navigate = useNavigate();

    const [expense, setExpense] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadExpense = async () => {
            try {
                const response = await getExpenseDetails(id);

                setExpense(response.data);
            } catch {
                navigate("/expenses");
            } finally {
                setLoading(false);
            }
        };

        loadExpense();
    }, [id]);

    if (loading) {
        return <div className="p-10">Loading...</div>;
    }

    const difference = Number(expense.amount) - Number(expense.itemsTotal);

    return (<div className="min-h-screen bg-slate-100">
            <Navbar/>

            <div className="max-w-5xl mx-auto p-8">
                <button
                    onClick={() => navigate("/expenses")}
                    className="
                        mb-6
                        text-blue-600
                        hover:underline
                    "
                >
                    ← Back
                </button>

                <div
                    className="
                        bg-white
                        rounded-3xl
                        shadow-lg
                        p-8
                    "
                >
                    <h1
                        className="
                            text-4xl
                            font-bold
                            mb-8
                        "
                    >
                        Expense Details
                    </h1>

                    <div
                        className="
                            grid
                            md:grid-cols-2
                            gap-6
                            mb-8
                        "
                    >
                        <div>
                            <p className="text-gray-500">Amount</p>

                            <h2 className="text-3xl font-bold">₹{expense.amount}</h2>
                        </div>

                        <div>
                            <p className="text-gray-500">Category</p>

                            <h2 className="text-2xl font-semibold">{expense.category}</h2>
                        </div>

                        <div>
                            <p className="text-gray-500">Description</p>

                            <p>{expense.description}</p>
                        </div>

                        <div>
                            <p className="text-gray-500">Expense Date</p>

                            <p>{new Date(expense.expenseDate).toLocaleString()}</p>
                        </div>
                    </div>

                    <div
                        className="
                            bg-slate-50
                            rounded-xl
                            p-5
                            mb-8
                        "
                    >
                        <div className="flex justify-between">
                            <span>Calculated Items Total</span>

                            <span className="font-bold">₹{expense.itemsTotal}</span>
                        </div>

                        {difference !== 0 && (<div
                                className="
                                    mt-4
                                    text-red-600
                                    font-semibold
                                "
                            >
                                Difference : ₹{difference}
                            </div>)}
                    </div>

                    <h2
                        className="
                            text-2xl
                            font-bold
                            mb-4
                        "
                    >
                        Items
                    </h2>

                    {expense.items.length === 0 ? (<div
                            className="
                                    text-center
                                    text-gray-500
                                    py-10
                                "
                        >
                            No item breakdown available.
                        </div>) : (<table
                            className="
                                    w-full
                                    border-collapse
                                "
                        >
                            <thead>
                            <tr
                                className="
                                            bg-slate-100
                                        "
                            >
                                <th className="p-3 text-left">Item</th>

                                <th className="p-3">Qty</th>

                                <th className="p-3">Unit Price</th>

                                <th className="p-3">Total</th>
                            </tr>
                            </thead>

                            <tbody>
                            {expense.items.map((item) => (<tr
                                    key={item.id}
                                    className="
                                                        border-b
                                                    "
                                >
                                    <td className="p-3">{item.itemName}</td>

                                    <td className="text-center">{item.quantity}</td>

                                    <td className="text-center">₹{item.unitPrice}</td>

                                    <td className="text-center">
                                        ₹{(item.quantity * item.unitPrice).toFixed(2)}
                                    </td>
                                </tr>))}
                            </tbody>
                        </table>)}
                </div>
            </div>
        </div>);
}

export default ExpenseDetails;
