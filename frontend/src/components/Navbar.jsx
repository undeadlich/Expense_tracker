import {Link, useLocation, useNavigate} from "react-router-dom";

import api from "../services/api";

import {useAuth} from "../context/AuthContext";

function Navbar() {
    const navigate = useNavigate();

    const location = useLocation();

    const {user, setUser} = useAuth();

    const handleLogout = async () => {
        try {
            await api.post("/logout");

            setUser(null);

            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    };

    return (<nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
                <div className="flex items-center gap-10">
                    <h1 className="text-2xl font-bold text-blue-600">Expense Tracker</h1>

                    <div className="flex gap-2">
                        <Link
                            to="/dashboard"
                            className={`px-4 py-2 rounded-lg transition ${location.pathname === "/dashboard" ? "bg-blue-100 text-blue-700 font-semibold" : "text-gray-600 hover:bg-gray-100"}`}
                        >
                            Dashboard
                        </Link>

                        <Link
                            to="/expenses"
                            className={`px-4 py-2 rounded-lg transition ${location.pathname === "/expenses" ? "bg-blue-100 text-blue-700 font-semibold" : "text-gray-600 hover:bg-gray-100"}`}
                        >
                            Expenses
                        </Link>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <p className="font-semibold text-gray-800">{user?.name}</p>

                        <p className="text-sm text-gray-500">Welcome Back 👋</p>
                    </div>

                    <div
                        className="
                            h-10
                            w-10
                            rounded-full
                            bg-blue-600
                            text-white
                            flex
                            items-center
                            justify-center
                            font-bold
                        "
                    >
                        {user?.name?.charAt(0)?.toUpperCase()}
                    </div>

                    <button
                        onClick={handleLogout}
                        className="
                            bg-red-500
                            hover:bg-red-600
                            text-white
                            px-4
                            py-2
                            rounded-lg
                            transition
                            shadow-sm
                        "
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>);
}

export default Navbar;
