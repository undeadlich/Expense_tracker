import {createContext, useContext, useEffect, useState} from "react";

import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const path = window.location.pathname;

        if (path === "/login" || path === "/signup") {
            setLoading(false);
            return;
        }

        const loadUser = async () => {
            try {
                const response = await api.get("/home");

                setUser(response.data);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    return (<AuthContext.Provider
            value={{
                user, setUser, loading,
            }}
        >
            {children}
        </AuthContext.Provider>);
}

export function useAuth() {
    return useContext(AuthContext);
}
