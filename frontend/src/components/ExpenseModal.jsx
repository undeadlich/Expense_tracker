import {useState, useEffect} from "react";
import {createExpense, editExpense} from "../services/expenseService";
import api from "../services/api";
import {useAuth} from "../context/AuthContext";
import ExpenseForm from "./ExpenseForm";
import ExpenseItems from "./ExpenseItems";
import toast from "react-hot-toast";

function ExpenseModal({isOpen, onClose, onSuccess, editingExpense}) {
    const {setUser} = useAuth();

    const [amount, setAmount] = useState("");

    const [category, setCategory] = useState("FOOD");

    const [description, setDescription] = useState("");

    const [items, setItems] = useState([]);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        if (editingExpense) {
            setAmount(String(editingExpense.amount));
            setCategory(editingExpense.category);
            setDescription(editingExpense.description || "");

            setItems(editingExpense.items ? editingExpense.items.map((item) => ({...item})) : [],);
        } else {
            setAmount("");
            setCategory("FOOD");
            setDescription("");
            setItems([]);
        }
    }, [isOpen, editingExpense]);

    const handleSave = async () => {
        const amountValue = Number(amount);

        if (amount === "" || isNaN(amountValue)) {
            toast.error("Enter valid amount");

            return;
        }

        if (amountValue <= 0) {
            toast.error("Amount must be greater than 0");

            return;
        }

        if (!category) {
            toast.error("Select category");

            return;
        }
        for (const item of items) {
            if (!item.itemName.trim()) {
                toast.error("Item name cannot be empty.");

                return;
            }

            if (!item.quantity || Number(item.quantity) <= 0) {
                toast.error("Quantity must be greater than 0.");

                return;
            }

            if (item.unitPrice === "" || Number(item.unitPrice) < 0) {
                toast.error("Unit price cannot be negative.");

                return;
            }
        }

        try {
            if (editingExpense) {
                await editExpense(editingExpense.id, {
                    amount: amountValue, category, description, items,
                });
            } else {
                await createExpense({
                    amount: amountValue, category, description, items,
                });
            }

            const response = await api.get("/home");

            setUser(response.data);

            setAmount("");
            setCategory("FOOD");
            setDescription("");

            onSuccess();

            onClose();
        } catch (error) {
            toast.error(error.response?.data || (editingExpense ? "Failed to update expense" : "Failed to create expense"),);
        }
    };

    if (!isOpen) {
        return null;
    }

    return (<div
            className="
        fixed
        inset-0
        bg-black/50
        backdrop-blur-sm
        flex
        justify-center
        items-center
        z-50
        p-4
    "
        >
            <div
                className="
        bg-white
        rounded-3xl
        shadow-2xl
        w-full
        max-w-2xl
        max-h-[90vh]
        overflow-y-auto
    "
            >
                <div
                    className="
                bg-gradient-to-r
                from-blue-600
                to-indigo-700
                p-6
                text-white
            "
                >
                    <h2 className="text-3xl font-bold">
                        {editingExpense ? "Edit Expense ✏️" : "Add Expense 💰"}
                    </h2>

                    <p className="text-blue-100 mt-2">
                        {editingExpense ? "Update your expense details" : "Record a new expense"}
                    </p>
                </div>

                <div className="p-6 space-y-5">
                    <ExpenseForm
                        amount={amount}
                        setAmount={setAmount}
                        category={category}
                        setCategory={setCategory}
                        description={description}
                        setDescription={setDescription}
                    />
                    <ExpenseItems items={items} setItems={setItems}/>

                    <div
                        className="
                    flex
                    justify-end
                    gap-3
                    pt-2
                "
                    >
                        <button
                            onClick={onClose}
                            className="
                            px-5
                            py-3
                            rounded-xl
                            border
                            hover:bg-gray-100
                            transition
                        "
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleSave}
                            className="
                            px-6
                            py-3
                            rounded-xl
                            text-white
                            font-semibold
                            bg-gradient-to-r
                            from-blue-600
                            to-indigo-700
                            hover:scale-105
                            transition
                            shadow-lg
                        "
                        >
                            {editingExpense ? "Update Expense" : "Save Expense"}
                        </button>
                    </div>
                </div>
            </div>
        </div>);
}

export default ExpenseModal;
