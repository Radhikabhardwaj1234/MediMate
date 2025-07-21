// import React from "react";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3">
//       <div className="container">
//         <Link className="navbar-brand text-medimate fw-bold fs-4" to="/">
//           <i className="bi bi-heart-pulse-fill me-2 text-danger"></i> MediMate
//         </Link>
//         <div className="ms-auto">
//           <Link to="/login" className="btn btn-outline-primary btn-sm me-2 btn-rounded">
//             Login
//           </Link>
//           <Link to="/register" className="btn btn-primary btn-sm btn-rounded">
//             Register
//           </Link>
         
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isLoggedIn = Boolean(token);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Where should the brand/logo go?
  const brandLink = isLoggedIn ? "/dashboard" : "/login";

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3">
      <div className="container">
     
        <Link className="navbar-brand text-medimate fw-bold fs-4" to={brandLink}>
          <i className="bi bi-heart-pulse-fill me-2 text-danger"></i> MediMate
        </Link>

        {/* Right-side buttons */}
        <div className="ms-auto d-flex align-items-center gap-2">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="btn btn-outline-primary btn-sm btn-rounded">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm btn-rounded">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="btn btn-outline-primary btn-sm btn-rounded">
                Dashboard
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-danger btn-sm btn-rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
