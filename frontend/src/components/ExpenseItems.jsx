import {useMemo} from "react";

function ExpenseItems({items, setItems}) {
    const addItem = () => {
        setItems([...items, {
            itemName: "", quantity: 1, unitPrice: "",
        },]);
    };

    const updateItem = (index, field, value) => {
        setItems(items.map((item, i) => i === index ? {
            ...item, [field]: value,
        } : item,),);
    };

    const removeItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };   

    const itemsTotal = useMemo(() => {
        return items.reduce((total, item) => {
                return (total + (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0));
            },

            0,);
    }, [items]);

    return (<div className="space-y-5">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Item Breakdown</h3>

                <button
                    type="button"
                    onClick={addItem}
                    className="
                        bg-green-600
                        text-white
                        px-4
                        py-2
                        rounded-lg
                        hover:bg-green-700
                    "
                >
                    + Add Item
                </button>
            </div>

            {items.length === 0 && (<div className="text-gray-500">No items added.</div>)}

            {items.map((item, index) => (<div
                    key={index}
                    className="
                                grid
                                grid-cols-12
                                gap-2
                                items-center
                            "
                >
                    <input
                        className="
                                    col-span-5
                                    border
                                    rounded-lg
                                    p-2
                                "
                        placeholder="Item"
                        value={item.itemName}
                        onChange={(e) => updateItem(index,

                            "itemName",

                            e.target.value,)}
                    />

                    <input
                        type="number"
                        className="
                                    col-span-2
                                    border
                                    rounded-lg
                                    p-2
                                "
                        placeholder="Qty"
                        value={item.quantity}
                        onChange={(e) => updateItem(index,

                            "quantity",

                            e.target.value,)}
                    />

                    <input
                        type="number"
                        className="
                                    col-span-3
                                    border
                                    rounded-lg
                                    p-2
                                "
                        placeholder="Price"
                        value={item.unitPrice}
                        onChange={(e) => updateItem(index,

                            "unitPrice",

                            e.target.value,)}
                    />

                    <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="
                                    col-span-2
                                    bg-red-500
                                    text-white
                                    rounded-lg
                                    p-2
                                "
                    >
                        Remove
                    </button>
                </div>))}

            <div className="text-right">
                <span className="font-semibold">Items Total:</span> ₹
                {itemsTotal.toFixed(2)}
            </div>
        </div>);
}

export default ExpenseItems;
