import {useState} from "react";
import api from "../services/api";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import toast from "react-hot-toast";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {setUser} = useAuth();
    const handleLogin = async (e) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Enter a valid email address");

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
        try {
            await api.post("/login", {
                email, password,
            });
            const response = await api.get("/home");

            setUser(response.data);

            navigate("/dashboard");
        } catch (error) {
            toast.error(error.response?.data || "Signup Failed");
        }
    };

    return (<div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-md w-96">
                <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border rounded-lg p-3"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border rounded-lg p-3"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-3 rounded-lg"
                    >
                        Login
                    </button>
                </form>

                <p className="mt-4 text-center">
                    Don't have an account?
                    <Link to="/signup" className="text-blue-600 ml-1">
                        Signup
                    </Link>
                </p>
            </div>
        </div>);
}

export default Login;
