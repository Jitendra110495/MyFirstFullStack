/* import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "./Login.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import type { FormEvent } from "react";


interface LoginErrors {
    email?: string;
    password?: string;
    login?: string;
}

// function Login({ onLogin }) {
function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<LoginErrors>({});
    const navigate = useNavigate();
    const { setIsLoggedIn } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);


    function validateForm(): boolean {
        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (!password) {
            newErrors.password = "Password is required.";
        } else if (password.length < 8) {
            newErrors.password = "Password must contain at least 8 characters.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }


    async function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ): Promise<void> {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(
                "http://localhost:5077/api/Auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Invalid email or password."
                );
            }

            localStorage.setItem("token", data.token);
            setIsLoggedIn(true);
            navigate("/dashboard");

            console.log("Login successful");

        } catch (error) {
            console.error("Login failed:", error);
            setErrors({
                login: error.message || "Unable to log in. Please try again."
            });
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <form className="login-container" onSubmit={handleSubmit}>
            <h1>Login</h1>

            {errors.login && (
                <Alert severity="error" role="alert">
                    {errors.login}
                </Alert>
            )}

            <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors(prev => ({
                        ...prev,
                        email: "",
                        login: ""
                    }));
                }}
                required
                fullWidth
                margin="normal"
                error={Boolean(errors.email)}
                helperText={errors.email}
            />

            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors(prev => ({
                        ...prev,
                        password: "",
                        login: ""
                    }));
                }}
                required
                fullWidth
                margin="normal"
                error={Boolean(errors.password)}
                helperText={errors.password}
            />


            <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isLoading}
                sx={{
                    borderRadius: "8px",
                    padding: "12px"
                }}
            >
                {isLoading ? "Logging in..." : "Login"}
            </Button>

        </form>
    );
}

export default Login; */


/* 
import { useState, useContext } from "react";
import type { SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "./Login.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";

interface LoginErrors {
    email?: string;
    password?: string;
    login?: string;
}

interface LoginResponse {
    token?: string;
    message?: string;
}

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<LoginErrors>({});
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { setIsLoggedIn } = useContext(AuthContext);

    function validateForm(): boolean {
        const newErrors: LoginErrors = {};

        if (!email.trim()) {
            newErrors.email = "Email is required.";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (!password) {
            newErrors.password = "Password is required.";
        } else if (password.length < 8) {
            newErrors.password =
                "Password must contain at least 8 characters.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    async function handleSubmit(
        event: SyntheticEvent<HTMLFormElement>
    ): Promise<void> {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(
                "http://localhost:5077/api/Auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data: LoginResponse = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Invalid email or password."
                );
            }

            if (!data.token) {
                throw new Error(
                    "Login response did not contain a token."
                );
            }

            localStorage.setItem("token", data.token);
            setIsLoggedIn(true);
            navigate("/dashboard");

            console.log("Login successful");
        } catch (error: unknown) {
            console.error("Login failed:", error);

            setErrors({
                login:
                    error instanceof Error
                        ? error.message
                        : "Unable to log in. Please try again."
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form
            className="login-container"
            onSubmit={handleSubmit}
        >
            <h1>Login</h1>

            {errors.login && (
                <Alert severity="error" role="alert">
                    {errors.login}
                </Alert>
            )}

            <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((prev) => ({
                        ...prev,
                        email: "",
                        login: ""
                    }));
                }}
                required
                fullWidth
                margin="normal"
                error={Boolean(errors.email)}
                helperText={errors.email}
            />

            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((prev) => ({
                        ...prev,
                        password: "",
                        login: ""
                    }));
                }}
                required
                fullWidth
                margin="normal"
                error={Boolean(errors.password)}
                helperText={errors.password}
            />

            <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isLoading}
                sx={{
                    borderRadius: "8px",
                    padding: "12px"
                }}
            >
                {isLoading ? "Logging in..." : "Login"}
            </Button>
        </form>
    );
}

export default Login;
 */


// import { useState, useContext } from "react";
import { useState } from "react";
import type { SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
// import AuthContext from "../context/AuthContext";
import "./Login.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import { login } from "../services/authService";
import { useAuth } from "../hooks/useAuth";

interface LoginErrors {
    email?: string;
    password?: string;
    login?: string;
}

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<LoginErrors>({});
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    // const { setIsLoggedIn } = useContext(AuthContext);
    const { setIsLoggedIn } = useAuth();

    function validateForm(): boolean {
        const newErrors: LoginErrors = {};

        if (!email.trim()) {
            newErrors.email = "Email is required.";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (!password) {
            newErrors.password = "Password is required.";
        } else if (password.length < 8) {
            newErrors.password =
                "Password must contain at least 8 characters.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    async function handleSubmit(
        event: SyntheticEvent<HTMLFormElement>
    ): Promise<void> {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const data = await login({
                email,
                password
            });

            if (!data.token) {
                throw new Error(
                    "Login response did not contain a token."
                );
            }

            localStorage.setItem("token", data.token);
            setIsLoggedIn(true);
            navigate("/dashboard");

            console.log("Login successful");
        } catch (error: unknown) {
            console.error("Login failed:", error);

            setErrors({
                login:
                    error instanceof Error
                        ? error.message
                        : "Unable to log in. Please try again."
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form
            className="login-container"
            onSubmit={handleSubmit}
        >
            <h1>Login</h1>

            {errors.login && (
                <Alert severity="error" role="alert">
                    {errors.login}
                </Alert>
            )}

            <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((prev) => ({
                        ...prev,
                        email: "",
                        login: ""
                    }));
                }}
                required
                fullWidth
                margin="normal"
                error={Boolean(errors.email)}
                helperText={errors.email}
            />

            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((prev) => ({
                        ...prev,
                        password: "",
                        login: ""
                    }));
                }}
                required
                fullWidth
                margin="normal"
                error={Boolean(errors.password)}
                helperText={errors.password}
            />

            <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isLoading}
                sx={{
                    borderRadius: "8px",
                    padding: "12px"
                }}
            >
                {isLoading ? "Logging in..." : "Login"}
            </Button>
        </form>
    );
}

export default Login;
