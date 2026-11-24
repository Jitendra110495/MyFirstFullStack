
//const API_URL = "http://localhost:5077";
const API_URL = import.meta.env.VITE_API_URL;

export class ApiError extends Error {
    constructor(
        message: string,
        public status: number
    ) {
        super(message);
        this.name = "ApiError";
    }
}

interface RequestOptions {
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    token?: string;
    body?: unknown;
}

export async function apiRequest<T>(
    endpoint: string,
    options: RequestOptions = {}
): Promise<T> {
    const headers: Record<string, string> = {};

    if (options.body !== undefined) {
        headers["Content-Type"] = "application/json";
    }

    if (options.token) {
        headers["Authorization"] = `Bearer ${options.token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        method: options.method ?? "GET",
        headers,
        body:
            options.body !== undefined
                ? JSON.stringify(options.body)
                : undefined
    });

    if (!response.ok) {
        throw new ApiError(
            "API request failed.",
            response.status
        );
    }

    if (response.status === 204) {
        return undefined as T;
    }

    return (await response.json()) as T;
}
