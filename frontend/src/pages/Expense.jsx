import {useState, useEffect} from "react";
import CategoryPieChart from "../components/CategoryPieChart";
import {useSearchParams} from "react-router-dom";

import Navbar from "../components/Navbar";

import ExpenseModal from "../components/ExpenseModal";

import ExpenseFilters from "../components/ExpenseFilters";

import ExpenseStats from "../components/ExpenseStats";

import ExpenseTable from "../components/ExpenseTable";

import ExpensePagination from "../components/ExpensePagination";

import {
    getExpenses, getExpenseDetails, deleteExpense,
} from "../services/expenseService";

import toast from "react-hot-toast";



function Expense() {
    const [loading, setLoading] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const [editingExpense, setEditingExpense] = useState(null);

    const [data, setData] = useState(null);

    const [searchParams, setSearchParams] = useSearchParams();

    const search = searchParams.get("search") || "";

    const category = searchParams.get("category") || "";

    const sort = searchParams.get("sort") || "";

    const fromDate = searchParams.get("fromDate") || "";

    const toDate = searchParams.get("toDate") || "";

    const page = Number(searchParams.get("page")) || 1;

    const loadExpenses = async () => {
        setLoading(true);

        const params = {
            search, category, sort, page, size: 10,
        };

        if (fromDate) {
            params.fromDate = fromDate;
        }

        if (toDate) {
            params.toDate = toDate;
        }

        try {
            const response = await getExpenses(params);

            setData(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Delete this expense?");

        if (!confirmed) {
            return;
        }

        try {
            await deleteExpense(id);

            loadExpenses();
        } catch (error) {
            toast.error(error.response?.data || "Delete failed");
        }
    };
    const handleEdit = async (expense) => {
        try {
            const response = await getExpenseDetails(expense.id);

            setEditingExpense(response.data);

            setShowModal(true);
        } catch (error) {
            toast.error(error.response?.data || "Failed to load expense.");
        }
    };

    useEffect(() => {
        loadExpenses();
    }, [search, category, sort, fromDate, toDate, page]);

    return (<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
            <Navbar/>

            <div className="max-w-7xl mx-auto p-8">
                <div
                    className="
                    bg-white
                    rounded-3xl
                    shadow-lg
                    p-8
                    mb-8
                "
                >
                    <div
                        className="
                        flex
                        justify-between
                        items-center
                    "
                    >
                        <div>
                            <h1
                                className="
                                text-5xl
                                font-bold
                                text-gray-800
                            "
                            >
                                Expenses
                            </h1>

                            <p
                                className="
                                text-gray-500
                                mt-3
                                text-lg
                            "
                            >
                                Track and manage your spending
                            </p>
                        </div>

                        <button
                            onClick={() => {
                                setEditingExpense(null);

                                setShowModal(true);
                            }}
                            className="
                                bg-blue-600
                                hover:bg-blue-700
                                text-white
                                px-6
                                py-3
                                rounded-xl
                                shadow-lg
                                transition
                            "
                        >
                            + Add Expense
                        </button>
                    </div>
                </div>

                <ExpenseFilters
                    search={search}
                    category={category}
                    sort={sort}
                    fromDate={fromDate}
                    toDate={toDate}
                    setSearchParams={setSearchParams}
                />

                <ExpenseStats data={data}/>

                {loading && (<div
                        className="
                        bg-white
                        rounded-2xl
                        shadow
                        p-4
                        mb-4
                        text-center
                    "
                    >
                        Loading...
                    </div>)}
                <div className="container">
                    {!category && data?.categoryTotals?.length > 0 && (<CategoryPieChart data={data?.categoryTotals}/>)}
                </div>
                <ExpenseTable
                    expenses={data?.expenses}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

                <ExpensePagination
                    page={page}
                    totalPages={data?.totalPages}
                    onPrevious={() => setSearchParams({
                        search, category, sort, fromDate, toDate, page: page - 1,
                    })}
                    onNext={() => setSearchParams({
                        search, category, sort, fromDate, toDate, page: page + 1,
                    })}
                />
            </div>

            <ExpenseModal
                isOpen={showModal}
                editingExpense={editingExpense}
                onClose={() => {
                    setShowModal(false);

                    setEditingExpense(null);
                }}
                onSuccess={loadExpenses}
            />
        </div>);
}

export default Expense;
