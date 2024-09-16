import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);


export const AuthProvider = ({ children, navigate }) => {
  const [user, setUser] = useState(null);

  //verify if user is logged in
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  //login user and store user data in local storage
  const login = (userData) => {
    console.log("Logging in with user data:", userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userData.token);
    console.log("Token:", userData.token);
    setUser(userData);
  };

  //logout user and remove user data from local storage
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    if (navigate) {
      navigate("/login");
    }
  };

  //update user data in local storage
  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  //check if token is valid
  const checkTokenValidity = async () => {
    const token = localStorage.getItem("token");
    console.log("Token being checked:", token);
    if (!token) return false;
    try {
      const response = await fetch("/api/user/profile", {
        headers: {
          Authorization: token,
        },
      });
      console.log("Token check response:", response.status);
      if (response.ok) {
        return true;
      } else {
        // Token is invalid, clear the user data
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
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
