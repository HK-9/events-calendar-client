
export const isAuthenticated = () => {
    return Boolean(localStorage.getItem("token")); // Check if token exists
  };
  
  export const getToken = () => {
    return localStorage.getItem("token");
  };
  
  export const login = (token) => {
    localStorage.setItem("token", token);
  };
  
  export const logout = () => {
    localStorage.removeItem("token");
  };
  