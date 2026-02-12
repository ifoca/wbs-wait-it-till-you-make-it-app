import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import { useAuthState } from "../contexts";

const Navbar = () => {
  const [sideBaropen, setSidebaropen] = useState(false);
  const { authToken, logout } = useAuthState();
  const navigate = useNavigate();
  const allowedSidebarData = authToken
    ? ["Homepage", "favorites", "userProfile", "logout"]
    : ["Homepage", "login", "register"];

  const displayedSidebarData = SidebarData.filter((item) =>
    allowedSidebarData.includes(item.title)
  );
  return (
    <div className="navbar bg-neutral shadow-sm relative flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="flex w-full items-center justify-between sm:w-auto">
        <img src="/src/static/assets/logo.png" alt="Logo" className="h-12 w-12" />
        <button
          className="btn btn-square btn-ghost sm:absolute sm:right-4 sm:top-1/2 sm:-translate-y-1/2"
          onClick={() => setSidebaropen(!sideBaropen)}
          aria-expanded={sideBaropen}
          aria-controls="navbar-sidebar"
          aria-label="Toggle sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current"
          >
            {' '}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>{' '}
          </svg>
        </button>
      </div>
      <div className="w-full sm:flex-1 sm:mx-4">
        <div className="text-xl font-semibold sm:text-2xl">Some text</div>
        <div className="text-xs font-light">Some smaller text</div>
      </div>
      {sideBaropen && (
        <ul
          id="navbar-sidebar"
          tabIndex={0}
          className="mt-2 w-full rounded-box bg-neutral p-3 shadow-lg sm:absolute sm:right-4 sm:top-full sm:mt-3 sm:w-56"
        >
          {displayedSidebarData.map((item) => (
            <li key={item.path} className={item.cName}>
              <Link
                to={item.path}
                className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-neutral-700"
                onClick={async (event) => {
                  if (item.title === "logout") {
                    event.preventDefault();
                    await logout();
                    setSidebaropen(false);
                    navigate("/");
                    return;
                  }
                  setSidebaropen(false);
                }}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="capitalize">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Navbar;