import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import userApi from "../api/userApi";

interface User {
  id: string;
  nickname: string;
  profileImage: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user?: User;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await userApi.getUser();
        if (response.data) {
          setIsAuthenticated(true);
          setUser(response.data);
        } else {
          setIsAuthenticated(false);
          setUser(undefined);
        }
      } catch {
        setIsAuthenticated(false);
        setUser(undefined);
      }
    };
    getUser();
  }, []);

  const logout = async () => {
    try {
      await userApi.logout();
    } finally {
      setIsAuthenticated(false);
      setUser(undefined);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// useAuth 훅
function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };
