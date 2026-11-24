
/* import { createContext } from "react";

const AuthContext = createContext();

export default AuthContext; */



import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

interface AuthContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;