import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");

    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  }

  // Check the cookie once to get the initial boolean state
  const initialUserPreStatus = getCookie("User_Registered") === "true";
  return initialUserPreStatus ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedRoutes;
