/* import { useState } from "react";
import AuthContext from "./AuthContext";

function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("token") !== null
    );
    function logout() {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider; */


import { useState } from "react";
import type { ReactNode } from "react";
import AuthContext from "./AuthContext";

interface AuthProviderProps {
    children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("token") !== null
    );

    function logout() {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    }

    return (
        <AuthContext.Provider
            value={{ isLoggedIn, setIsLoggedIn, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;