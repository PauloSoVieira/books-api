import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children, navigate }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    if (navigate) {
      navigate("/login");
    }
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const checkTokenValidity = async () => {
    if (!user || !user.token) return false;

    try {
      const response = await fetch("/api/user/profile", {
        headers: {
          Authorization: user.token,
        },
      });

      if (response.ok) {
        return true;
      } else {
        // Token is invalid, clear the user data
        setUser(null);
        localStorage.removeItem("user");
        return false;
      }
    } catch (error) {
      console.error("Error checking token validity:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, logout, updateUser, checkTokenValidity }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
