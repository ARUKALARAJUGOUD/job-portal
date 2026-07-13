// import { useContext, useState } from "react";
// import { createContext } from "react-router-dom";
import { createContext, useContext, useState } from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuthenticated, setIsAuthenticated ,loading,setLoading}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
