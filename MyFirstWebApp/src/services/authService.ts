
import { apiRequest } from "./apiClient";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}

export function login(
    credentials: LoginRequest
): Promise<LoginResponse> {
    return apiRequest<LoginResponse>("/api/Auth/login", {
        method: "POST",
        body: credentials
    });
}
