const Navbar = () => {
  return (
    <div className="navbar bg-neutral shadow-sm">
      <div>
        <img src="/src/static/assets/logo.png" alt="Logo" className="w-12 h-12" />
      </div>
      <div className="flex-1 mx-4">
        <div className="text-2xl font-semibold">Some text</div>
        <div className="text-xs font-light">Some smaller text</div>
      </div>
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
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
    </div>
  );
};

export default Navbar;
