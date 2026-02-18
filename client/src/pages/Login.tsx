import { NavLink, useNavigate } from 'react-router-dom';
import { useState, type FormEvent } from 'react';
import { useErrorAndLoadingState, useAuthState } from '../contexts';
import { ErrorMessage, LoadingMessage } from '../components';

type LoginFormState = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const { error, setError, loading, setLoading } = useErrorAndLoadingState();
  const { authToken, setAuth } = useAuthState();

  const [{ email, password }, setForm] = useState<LoginFormState>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e: FormEvent) => {
    const apiBaseUrl = import.meta.env.VITE_SERVER_API_URL;
    e.preventDefault();

    try {
      if (!email || !password) {
        throw new Error('All fields are required');
      }
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
        const errorData = await res.json();
        throw new Error(errorData.message || 'Login failed!');
      }

      setAuth(true);
      navigate('/'); // Navigate to Homepage
    } catch (error: unknown) {
      const message = (error as { message: string }).message;
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = !email || !password;

  if (loading) {
    return <LoadingMessage />;
  }

  if (authToken) {
    return (
      <div className="text-center p-8">
        <p className="p-4">You are already logged in!</p>
        <button onClick={() => navigate('/')} className="btn btn-sm bg-base-300 hover:bg-neutral">
          Go to Homepage
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="text-center">
        <h1 className="text-3xl font-bold px-4">Welcome back</h1>
        <p className="text-sm px-4">Sign in to view your saved stations.</p>
      </div>
      {error && <ErrorMessage error={error} />}
      <div>
        <form
          onSubmit={handleLogin}
          className="flex items-center flex-col gap-6 p-4 bg-base-300 text-neutral-content rounded-box"
        >
          <h1 className="text-xl font-semibold">Log in</h1>
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
              onChange={handleChange}
              name="email"
              type="email"
              id="email"
              placeholder="mail@site.com"
              required
            />
          </label>
          <div className="validator-hint hidden">Enter a valid email address.</div>
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
              onChange={handleChange}
              name="password"
              type="password"
              id="password"
              required
              placeholder="Password"
              minLength={6}
            />
          </label>
          <p className="validator-hint hidden">Password must be at least 6 characters long.</p>
          <button
            className={`btn ${!isDisabled ? 'bg-base-100' : ''} hover:bg-neutral w-24`}
            disabled={isDisabled}
            type="submit"
          >
            Submit
          </button>
        </form>
        <div className="text-center">
          <p className="p-4">
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
