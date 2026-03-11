import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";

const DashboardLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let ok = false;
    try {
      const token = localStorage.getItem("userToken");
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1] || '')); 
        if (!payload.exp || Date.now() < payload.exp * 1000) {
          ok = true;
        }
      }
    } catch {}
    if (!ok) {
      navigate("/auth/login");
    }
  }, [navigate]);

  return <Outlet />;
};

export default DashboardLayout;
