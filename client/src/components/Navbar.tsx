import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import { useAuthState } from '../contexts';

const Navbar = () => {
  const navigate = useNavigate();
  const sidebarRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [sideBaropen, setSidebaropen] = useState(false);
  const { authToken, logout } = useAuthState();
  const allowedSidebarData = authToken
    ? ['Homepage', 'Favorites', 'Logout']
    : ['Homepage', 'Login', 'Register'];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        (sidebarRef.current && sidebarRef.current.contains(target)) ||
        (buttonRef.current && buttonRef.current.contains(target))
      ) {
        return;
      }

      setSidebaropen(false);
    };

    if (sideBaropen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sideBaropen]);

  const displayedSidebarData = SidebarData.filter((item) =>
    allowedSidebarData.includes(item.title),
  );

  return (
    <div className="navbar bg-base-300 text-neutral-content">
      <div>
        <img src="/assets/logo.svg" alt="Logo" className="w-12 h-12" />
      </div>
      <div className="flex-1 mx-4">
        <div className="text-xl font-bold">Wait it till you make it</div>
        <div className="text-xs font-light">Leave home on time, every time</div>
      </div>
      <div className="flex-none">
        <button
          ref={buttonRef}
          className="btn btn-square btn-ghost hover:bg-base-100"
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
            ref={sidebarRef}
            id="navbar-sidebar"
            tabIndex={0}
            className="absolute bg-base-300 right-0 mt-auto w-56 rounded-box p-2 shadow-lg z-50"
          >
            {displayedSidebarData.map((item) => (
              <li key={item.title} className={item.cName}>
                <Link
                  to={item.path}
                  className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-base-100"
                  onClick={async (event) => {
                    if (item.title === 'Logout') {
                      event.preventDefault();
                      logout();
                      setSidebaropen(false);
                      navigate('/');
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
    </div>
  );
};

export default Navbar;
