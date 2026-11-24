/* 
import type { User } from "../types/user";

const API_URL = "http://localhost:5077";

export class ApiError extends Error {
    constructor(
        message: string,
        public status: number
    ) {
        super(message);
        this.name = "ApiError";
    }
}

export async function getUsers(token: string): Promise<User[]> {
    const response = await fetch(`${API_URL}/api/users`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new ApiError("Failed to load users.", response.status);
    }

    const data: User[] = await response.json();

    return data;
}
 */



import type { User } from "../types/user";
import { apiRequest } from "./apiClient";

export { ApiError } from "./apiClient";

export function getUsers(token: string): Promise<User[]> {
    return apiRequest<User[]>("/api/users", {
        token
    });
}
