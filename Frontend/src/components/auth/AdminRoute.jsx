import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function AdminRoute() {
    const token = localStorage.getItem("jwt");

    // 1. If no token, user is clearly not an admin
    if (!token) return <Navigate to="/login" replace />;

    try {
        const decoded = jwtDecode(token);

        // 2. Check if the token is expired (jwt-decode doesn't do this automatically)
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            localStorage.removeItem("jwt");
            return <Navigate to="/login" replace />;
        }

        // 3. Trust the 'role' claim assigned by your backend
        if (decoded.role !== 'admin') {
            return <Navigate to="/" replace />;
        }

        // If we passed these checks, the user is an admin.
        return <Outlet />;

    } catch (error) {
        // If the token is corrupt or unreadable
        localStorage.removeItem("jwt");
        return <Navigate to="/login" replace />;
    }
}