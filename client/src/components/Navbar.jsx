import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="mx-auto max-w-7xl flex justify-between items-center">
                <h2 className="font-bold text-lg">Focus Habit Tracker</h2>

                <div className="flex gap-4">
                    <NavLink
                        to="/dashboard/daily-log"
                        className={({ isActive }) =>
                            isActive ? "text-yellow-400" : "text-white"
                        }
                    >
                        Daily Log
                    </NavLink>

                    <NavLink
                        to="/dashboard/history"
                        className={({ isActive }) =>
                            isActive ? "text-yellow-400" : "text-white"
                        }
                    >
                        History
                    </NavLink>

                    <NavLink
                        to="/dashboard/analytics"
                        className={({ isActive }) =>
                            isActive ? "text-yellow-400" : "text-white"
                        }
                    >
                        Analytics
                    </NavLink>

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}
