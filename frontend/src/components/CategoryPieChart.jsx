import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4", "#EC4899", "#84CC16", "#F97316",];

function CategoryPieChart({data}) {
    if (!data || data.length === 0) {
        return (<div
                className="
                bg-white
                rounded-3xl
                shadow-lg
                p-8
                text-center
            "
            >
                No data available
            </div>);
    }

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
                text-2xl
                font-bold
                mb-6
            "
            >
                Category Breakdown
            </h2>

            <div
                style={{
                    width: "100%", height: 400,
                }}
            >
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="total"
                            nameKey="category"
                            cx="50%"
                            cy="50%"
                            outerRadius={130}
                            label
                        >
                            {data.map((entry, index) => (<Cell key={index} fill={COLORS[index % COLORS.length]}/>))}
                        </Pie>

                        <Tooltip/>

                        <Legend/>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>);
}

export default CategoryPieChart;
