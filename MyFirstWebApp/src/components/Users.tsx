/* 
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "./Users.css";
import UserCard from "./UserCard";
import type { User } from "../types/user";
import { ApiError, getUsers } from "../services/userService";

function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    useEffect(() => {
        async function loadUsers() {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    logout();
                    navigate("/login");
                    return;
                }

                const data = await getUsers(token);
                setUsers(data);
            } catch (err: unknown) {
                if (err instanceof ApiError && err.status === 401) {
                    logout();
                    navigate("/login");
                    return;
                }

                setError(
                    err instanceof Error
                        ? err.message
                        : "An unexpected error occurred."
                );
            } finally {
                setIsLoading(false);
            }
        }

        loadUsers();
    }, [logout, navigate]);

    return (
        <div className="users-container">
            <div className="users-header">
                <h1>Users</h1>

                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>

            {isLoading && <p>Loading users...</p>}

            {!isLoading && error && <p>{error}</p>}

            {!isLoading && !error && users.length === 0 && (
                <p>No users found.</p>
            )}

            <div className="users-grid">
                {!isLoading &&
                    !error &&
                    users.map((user) => (
                        <UserCard key={user.id} user={user} />
                    ))}
            </div>
        </div>
    );
}

export default Users; */



// import { useContext, useEffect } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import AuthContext from "../context/AuthContext";
import "./Users.css";
import UserCard from "./UserCard";
import { useUsers } from "../hooks/useUsers";
import { useAuth } from "../hooks/useAuth";

function Users() {
    // const { logout } = useContext(AuthContext);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const {
        users,
        isLoading,
        error,
        isUnauthorized
    } = useUsers(token);

    useEffect(() => {
        if (isUnauthorized) {
            logout();
            navigate("/login", { replace: true });
        }
    }, [isUnauthorized, logout, navigate]);

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <div className="users-container">
            <div className="users-header">
                <h1>Users</h1>

                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>

            {isLoading && <p>Loading users...</p>}

            {!isLoading && error && <p>{error}</p>}

            {!isLoading && !error && !isUnauthorized &&
                users.length === 0 && (
                    <p>No users found.</p>
                )}

            <div className="users-grid">
                {!isLoading &&
                    !error &&
                    !isUnauthorized &&
                    users.map((user) => (
                        <UserCard
                            key={user.id}
                            user={user}
                        />
                    ))}
            </div>
        </div>
    );
}

export default Users;
