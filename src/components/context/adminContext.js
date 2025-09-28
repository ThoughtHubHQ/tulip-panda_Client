// AdminDashboardContext.js
import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

// 1. Create context
const AdminDashboardContext = createContext();

// 2. Provider component
const AdminDashboardProvider = ({ children }) => {
    // Initialize state from cookies or default values
    const initialData = (() => {
        const cookieData = Cookies.get("adminDashboard");
        if (cookieData) {
            try {
                const parsed = JSON.parse(cookieData);
                return {
                    adminDashboard: parsed?.adminDashboard || {
                        pendingOrder: 0,
                        totalDelivered: 0,
                        totalSales: 0,
                        totalUsers: 0,
                        totalProducts: 0,
                    }
                };
            } catch (error) {
                console.error("Failed to parse adminDashboard cookie:", error);
            }
        }
        // Default structure if cookie not present
        return {
            adminDashboard: {
                pendingOrder: 0,
                totalDelivered: 0,
                totalSales: 0,
                totalUsers: 0,
                totalProducts: 0,
            }
        };
    })();

    const [adminDashboardData, setAdminDashboardData] = useState(initialData);

    return (
        <AdminDashboardContext.Provider value={{ adminDashboardData, setAdminDashboardData }}>
            {children}
        </AdminDashboardContext.Provider>
    );
};

// 3. Custom hook
const useAdmin = () => useContext(AdminDashboardContext);

export { useAdmin, AdminDashboardProvider };