import { useState } from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
const Navbar = () => {
  const [sideBaropen, setSidebaropen] = useState(false);
  return (
    <div className="navbar bg-neutral shadow-sm">
      <div>
        <img src="/src/static/assets/logo.png" alt="Logo" className="w-12 h-12" />
      </div>
      <div className="flex-1 mx-4">
        <div className="text-2xl font-semibold">Some text</div>
        <div className="text-xs font-light">Some smaller text</div>
      </div>
      <div className="flex-none relative">
        <button
          className="btn btn-square btn-ghost"
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
        {sideBaropen && (
          <ul
            id="navbar-sidebar"
            tabIndex={0}
            className="absolute right-0 mt-3 w-56 rounded-box bg-neutral p-3 shadow-lg"
          >
            {SidebarData.map((item) => (
              <li key={item.path} className={item.cName}>
                <Link
                  to={item.path}
                  className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-neutral-700"
                  onClick={() => setSidebaropen(false)}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="capitalize">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
    
  );
};

export default Navbar;
