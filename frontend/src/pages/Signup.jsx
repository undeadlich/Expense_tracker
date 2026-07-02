import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import api from "../services/api";
import {useAuth} from "../context/AuthContext";
import toast from "react-hot-toast";

function Signup() {
    const {setUser} = useAuth();

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Enter a valid email address");

            return;
        }
        if (!name.trim()) {
            toast.error("Name is required");
            return;
        }

        if (!email.trim()) {
            toast.error("Email is required");
            return;
        }

        if (!password.trim()) {
            toast.error("Password is required");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        try {
            await api.post("/signup", {
                name, email, password,
            });
            const response = await api.get("/home");

            setUser(response.data);
            //toast.error("Signup Successful");

            navigate("/dashboard");
        } catch (error) {
            toast.error(error.response?.data || "Signup Failed");
        }
    };

    return (<div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-2">Create Account</h1>

                <p className="text-gray-500 text-center mb-6">
                    Sign up to start tracking your expenses
                </p>

                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">Name</label>

                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Email</label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Password</label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-600">
                    Already have an account?
                    <Link
                        to="/login"
                        className="text-blue-600 font-medium ml-1 hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>);
}

export default Signup;
