import axios from "axios";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  //login user
  const login = async (email, password) => {
    try {
      //send the post reuqest to backedn with email and password and deconstruct the data from thr response
      const { data } = await axios.post("/api/auth/login", { email, password });
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data)); //store token as name user into the local storage
      return data;
    } catch (error) {
      console.error("Error in login user", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  //register user function
  const register = async (name, email, password) => {
    try {
      const { data } = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });

      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));

      return data;
    } catch (error) {
      console.error("Error registering user", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
