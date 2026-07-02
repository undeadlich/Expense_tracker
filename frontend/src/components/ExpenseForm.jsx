function ExpenseForm({
                         amount, setAmount,

                         category, setCategory,

                         description, setDescription,
                     }) {
    return (<div className="space-y-5">
            <div>
                <label className="block font-medium mb-2">Amount</label>

                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="
                        w-full
                        border
                        rounded-xl
                        p-3
                        focus:ring-2
                        focus:ring-blue-500
                    "
                />
            </div>

            <div>
                <label className="block font-medium mb-2">Category</label>

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="
                        w-full
                        border
                        rounded-xl
                        p-3
                    "
                >
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
            </div>

            <div>
                <label className="block font-medium mb-2">Description</label>

                <textarea
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="
                        w-full
                        border
                        rounded-xl
                        p-3
                    "
                />
            </div>
        </div>);
}

export default ExpenseForm;
