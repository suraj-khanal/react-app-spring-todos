import { createContext, useContext, useState } from "react";
import { executeBasicAuthenticationService } from "../api/HelloWorldApiService";

//Create a context
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

//Share the created context with other components
export default function AuthProvider({ children }) {
  //Put some some state in the context
  const [isAuthenticated, setAuthenticated] = useState(false);

  const [username, setUsername] = useState(null);

  // function login(username, password) {
  //     if (username === "suraj" && password === "password") {
  //         setAuthenticated(true)
  //         setUsername(username)
  //         return true
  //       } else {
  //         setAuthenticated(false)
  //         setUsername(null)
  //         return false
  //       }
  // }

  async function login(username, password) {
    const baToken = "Basic " + window.btoa(username + ":" + password);

    try {
      const response = await executeBasicAuthenticationService(baToken);

      if (response.status == 200) {
        setAuthenticated(true)
        setUsername(username)
        return true
      } else {
        setAuthenticated(false)
        setUsername(null)
        return false
      }
    } catch (error) {
      setAuthenticated(false);
      setUsername(null)
      return false
    }
  }

  function logout() {
    setAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, username }}>
      {children}
    </AuthContext.Provider>
  );
}
