import { NavLink, useNavigate } from 'react-router-dom';
import { useState, type FormEvent } from 'react';
import { useErrorAndLoadingState, useAuthState } from '../contexts';
import { ErrorMessage, LoadingMessage } from '../components';

const Login = () => {
  const { error, setError, loading, setLoading } = useErrorAndLoadingState();
  const { authToken, setAuth } = useAuthState();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    const apiBaseUrl = import.meta.env.VITE_SERVER_API_URL;
    e.preventDefault();

    try {
      setError(null);
      setLoading(true);
      const res = await fetch(`${apiBaseUrl}/auth/user/login`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Login failed!');
      }

      setAuth(true);
      navigate('/user/profile'); // Navigate to profile page
    } catch (error: unknown) {
      const message = (error as { message: string }).message;
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = !email || !password;

  /* TO DO: 
  - check if the user is already logged in
    - if yes, redirect to homepage when they try to access the login page
  */

  if (loading) {
    return <LoadingMessage />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  // TO DO: implement logic to redirect somewhere else
  if (authToken) {
    return <p>I am logged in</p>;
  }

  return (
    <>
      <div>
        <form onSubmit={handleLogin} className="flex flex-col gap-8 items-center m-4 p-4">
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
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="email"
              id="email"
              placeholder="mail@site.com"
              required
            />
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          <button
            className={`btn ${!isDisabled ? 'bg-neutral' : ''}`}
            disabled={isDisabled}
            type="submit"
          >
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
