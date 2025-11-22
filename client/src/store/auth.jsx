import { createContext, useContext, useState, useEffect } from "react";

// Create the context
const AuthContext = createContext();

// Create Provider Component
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState("");
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const API = import.meta.env.VITE_API_URL;
  
  const authorizationToken = token ? `Bearer ${token}` : "";

  // Store token in LocalStorage
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  // Remove token (useful for logout)
  const removeTokenFromLS = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };

  // Keep token synced even after refresh
  // useEffect(() => {
  //   const storedToken = localStorage.getItem("token");
  //   if (storedToken) setToken(storedToken);
  // }, []);

  //get loggendIN user data
  const userAuthentication = async () => {
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);

      const URL = `${API}/api/auth/user`;
      const options = {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      };
      const response = await fetch(URL, options);
      //console.log(response);

      if (!response.ok) {
        // Token invalid / expired – clean up
        removeTokenFromLS();
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      setUser(data.userData || null);
      //console.log(`loggedIn user data ${data.userData}`);
      setIsLoading(false);
    } catch (error) {
      //console.log("User authentication:", error);
      setIsLoading(false);
    }
  };

  //get services data from database
  const getServices = async () => {
    try {
      const URL = `${API}/api/data/service`;
      const response = await fetch(URL);

      if (response.ok) {
        const data = await response.json();
        setServices(data.servicesData || []);
        // //console.log(data.msg);
      } else {
        setServices([]);
      }
    } catch (error) {
      //console.log("Service page:", error);
      setServices([]);
    }
  };

  useEffect(()=>{
    getServices();
  },[API]);

  useEffect(() => {
    userAuthentication();
  },[token]); //re-run when token changes


  // Value passed to all children
  const value = {
    token,
    storeTokenInLS,
    removeTokenFromLS,
    isLoggedIn: !!token,
    user,
    services,
    authorizationToken,
    isLoading,
    API,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook for using Auth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
