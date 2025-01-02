import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AuthLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const { exp, pad } = JSON.parse(atob(token.split(".")[1]));
      if (exp * 1000 < Date.now()) {
        navigate("/login");
        localStorage.removeItem("token");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
