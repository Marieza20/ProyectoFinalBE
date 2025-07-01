import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null); // Nuevo estado

  useEffect(() => {
    const userCookie = Cookies.get("user");
    const userIdCookie = Cookies.get("user_id"); // Lee el user_id

    if (userCookie) setUser(JSON.parse(userCookie));
    if (userIdCookie) setUserId(userIdCookie);
  }, []);

  const login = (userData) => {
    setUser(userData);
    Cookies.set("user", JSON.stringify(userData), { expires: 60 });

    // Si no has leído el user_id directamente del backend, lo puedes sacar de userData.id
    if (userData.id) {
      setUserId(userData.id);
      Cookies.set("user_id", userData.id, { expires: 60 });
    }
  };

  const logout = () => {
    setUser(null);
    setUserId(null);
    Cookies.remove("user");
    Cookies.remove("user_id");
  };

  return (
    <AuthContext.Provider value={{ user, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
