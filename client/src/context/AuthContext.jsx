import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const signup = async (email, password) => {
        const res = await axios.post("http://localhost:5000/api/auth/signup", { email, password });
        localStorage.setItem("token", res.data.token);
        const userData = { id: res.data.user.id, email: res.data.user.email };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const login = async (email, password) => {
        const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
        localStorage.setItem("token", res.data.token);
        const userData = { id: res.data.user.id, email: res.data.user.email };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, signup, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
