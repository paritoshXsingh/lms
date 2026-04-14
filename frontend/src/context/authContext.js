import axios from "axios";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  //login user
  const login = async (email, password) => {
    try {
      //send the post reuqest to backedn with email and password and deconstruct the data from thr response
      const { data } = await axios.post("/api/auth/login", { email, password });
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data)); //store user info in local storage
    } catch (error) {
      console.error("Error in login user", error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  //register user function

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  useContext(AuthContext);
  return;
};
