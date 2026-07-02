import {BrowserRouter, Routes, Route} from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Expense from "./pages/Expense";
import ExpenseDetails from "./pages/ExpenseDetails";

import ProtectedRoute from "./components/ProtectedRoute";

import {Toaster} from "react-hot-toast";

function App() {
    return (<BrowserRouter>
            <Toaster
                //position="top-centre"
                reverseOrder={false}
            />

            <Routes>
                <Route
                    path="/signup"
                    element={<Signup/>}
                />

                <Route
                    path="/login"
                    element={<Login/>}
                />

                <Route
                    path="/dashboard"
                    element={<ProtectedRoute>
                        <Dashboard/>
                    </ProtectedRoute>}
                />

                <Route
                    path="/expenses/:id"
                    element={<ProtectedRoute>
                        <ExpenseDetails/>
                    </ProtectedRoute>}
                />

                <Route
                    path="/expenses"
                    element={<ProtectedRoute>
                        <Expense/>
                    </ProtectedRoute>}
                />
            </Routes>
        </BrowserRouter>);
}

export default App;