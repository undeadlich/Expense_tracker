import {useEffect} from "react";
import {useLocation} from "react-router-dom";

import Navbar from "../components/Navbar";
import api from "../services/api";

import {useAuth} from "../context/AuthContext";

function Dashboard() {
    const {user, setUser} = useAuth();

    const location = useLocation();

    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await api.get("/home");

                setUser(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        loadUser();
    }, [location.pathname]);

    return (<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
            <Navbar/>

            <div className="max-w-7xl mx-auto p-8">
                <div
                    className="
                        bg-gradient-to-r
                        from-blue-600
                        to-indigo-700
                        text-white
                        rounded-3xl
                        p-10
                        shadow-xl
                        mb-8
                    "
                >
                    <h1 className="text-5xl font-bold">Welcome Back 👋</h1>

                    <p className="mt-4 text-xl text-blue-100">Hello {user?.name}</p>

                    <p className="mt-2 text-blue-200">
                        Track your spending and stay in control of your finances.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <div
                        className="
                            bg-white
                            rounded-2xl
                            shadow-md
                            hover:shadow-xl
                            transition
                            duration-300
                            p-7
                            border-l-4
                            border-blue-500
                        "
                    >
                        <p className="text-gray-500 font-medium">Total Expenses</p>

                        <h2 className="text-4xl font-bold mt-3 text-gray-800">
                            ₹{user?.totalExpenses ?? 0}
                        </h2>
                    </div>

                    <div
                        className="
                            bg-white
                            rounded-2xl
                            shadow-md
                            hover:shadow-xl
                            transition
                            duration-300
                            p-7
                            border-l-4
                            border-green-500
                        "
                    >
                        <p className="text-gray-500 font-medium">Total Entries</p>

                        <h2 className="text-4xl font-bold mt-3 text-gray-800">
                            {user?.totalExpensesCount ?? 0}
                        </h2>
                    </div>

                    <div
                        className="
                            bg-white
                            rounded-2xl
                            shadow-md
                            hover:shadow-xl
                            transition
                            duration-300
                            p-7
                            border-l-4
                            border-purple-500
                        "
                    >
                        <p className="text-gray-500 font-medium">This Month</p>

                        <h2 className="text-4xl font-bold mt-3 text-gray-800">
                            ₹{user?.currentMonthExpenses ?? 0}
                        </h2>
                    </div>
                </div>

                <div
                    className="
                        mt-8
                        bg-white
                        rounded-3xl
                        shadow-md
                        p-8
                    "
                >
                    <h2 className="text-2xl font-bold mb-4">Quick Overview</h2>

                    <p className="text-gray-600 leading-7">
                        You have recorded
                        <span className="font-bold text-blue-600">
              {" "}
                            {user?.totalExpensesCount ?? 0}{" "}
            </span>
                        expenses with a total spending of
                        <span className="font-bold text-red-500">
              {" "}
                            ₹{user?.totalExpenses ?? 0}
            </span>
                        .
                    </p>

                    <p className="text-gray-600 mt-3">
                        This month you've spent
                        <span className="font-bold text-green-600">
              {" "}
                            ₹{user?.currentMonthExpenses ?? 0}
            </span>
                        .
                    </p>
                </div>
            </div>
        </div>);
}

export default Dashboard;
