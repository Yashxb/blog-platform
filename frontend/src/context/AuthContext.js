import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  //  Load from localStorage on first mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      }
    } catch (error) {
      console.error("Error loading auth data:", error);
      localStorage.clear();
    }
  }, []);

  //  Login
  const login = (userData, userToken) => {
    if (!userToken) {
      console.warn("No token provided during login");
      return;
    }

    setUser(userData);
    setToken(userToken);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userToken);

    console.log("User logged in & token saved ");
  };


  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    console.log("User logged out ✅");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
