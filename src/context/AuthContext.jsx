import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  
  useEffect(() => {
    const storedUser = localStorage.getItem("activeTrackUser");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  
  useEffect(() => {
    if (user) {
      localStorage.setItem("activeTrackUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("activeTrackUser");
    }
  }, [user]);

  
  const signup = ({ username, email, password }) => {
    const existingUser = localStorage.getItem(`user_${username}`);
    if (existingUser) {
      return { success: false, message: "Username already exists." };
    }
    const newUser = { username, email, password };
    localStorage.setItem(`user_${username}`, JSON.stringify(newUser));
    setUser({ username, email });
    return { success: true };
  };

 
  const login = ({ username, password }) => {
    const storedUser = localStorage.getItem(`user_${username}`);
    if (!storedUser) return { success: false, message: "User not found." };

    const parsed = JSON.parse(storedUser);
    if (parsed.password !== password)
      return { success: false, message: "Incorrect password." };

    setUser({ username: parsed.username, email: parsed.email });
    return { success: true };
  };

  
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
