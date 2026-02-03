import { NavLink } from 'react-router-dom';

const Login = () => {
  /* TO DO: 
  - check if the user is already logged in
    - if yes, redirect to homepage when they try to access the login page
  */
  return (
    <>
      <div>
        <form className="flex flex-col gap-8 items-center m-4 p-4">
          <label className="input validator">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            <input name="email" type="email" id="email" placeholder="mail@site.com" required />
          </label>
          {/* TO DO: add error handling */}
          <div className="validator-hint hidden">Enter valid email address</div>
          <label className="input validator">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              name="password"
              type="password"
              id="password"
              required
              placeholder="Password"
              // minLength={6}
              // pattern=".{6,}"
            />
          </label>
          {/* TO DO: add error handling */}
          <p className="validator-hint hidden">Password must be at least 6 characters long.</p>
          <button className="btn bg-neutral p-4" type="submit">
            Log in
          </button>
        </form>
        <div className="text-center">
          <p>
            Don't have an account?{' '}
            <NavLink className="text-neutral-content underline" to={'/user/register'}>
              Register here
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
