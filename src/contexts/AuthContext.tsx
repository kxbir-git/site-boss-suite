import { createContext, useContext, useState, ReactNode } from "react";

type Role = "admin" | "user" | null;

interface AuthContextType {
  isLoggedIn: boolean;
  role: Role;
  userName: string;
  login: (role: Role, name: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  role: null,
  userName: "",
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<Role>(null);
  const [userName, setUserName] = useState("");

  const login = (r: Role, name: string) => {
    setIsLoggedIn(true);
    setRole(r);
    setUserName(name);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setRole(null);
    setUserName("");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
