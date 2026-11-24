
import { useEffect, useState } from "react";
import type { User } from "../types/user";
import { ApiError, getUsers } from "../services/userService";

interface UseUsersResult {
    users: User[];
    isLoading: boolean;
    error: string;
    isUnauthorized: boolean;
}

export function useUsers(token: string | null): UseUsersResult {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [isUnauthorized, setIsUnauthorized] = useState(false);

    useEffect(() => {
        async function loadUsers() {
            try {
                if (!token) {
                    setIsUnauthorized(true);
                    return;
                }

                const data = await getUsers(token);
                setUsers(data);
            } catch (err: unknown) {
                if (err instanceof ApiError && err.status === 401) {
                    setIsUnauthorized(true);
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
    }, [token]);

    return {
        users,
        isLoading,
        error,
        isUnauthorized
    };
}
