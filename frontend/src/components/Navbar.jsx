import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isLoggedIn = Boolean(token);
  const brandLink = isLoggedIn ? "/dashboard" : "/";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("medimateUser");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[#e2e8f0]">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to={brandLink} className="flex items-center gap-2 no-underline">
          <i className="bi bi-heart-pulse text-[#0d6efd] text-lg" />
          <span className="font-extrabold text-[#0f172a]">MediMate</span>
        </Link>

        <div className="flex items-center gap-2">
          {!isLoggedIn ? (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/register">Register</Link>
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="destructive" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
