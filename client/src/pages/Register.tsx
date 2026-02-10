import { useState, type FormEvent } from 'react';
import { ErrorMessage, LoadingMessage } from '../components';
import { useErrorAndLoadingState, useAuthState } from '../contexts';
import { useNavigate } from 'react-router-dom';

type RegisterFormState = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const navigate = useNavigate();
  const { error, setError, loading, setLoading } = useErrorAndLoadingState();
  const { authToken, setAuth } = useAuthState();

  const [{ username, email, password, confirmPassword }, setForm] = useState<RegisterFormState>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleRegistration = async (e: FormEvent) => {
    const apiBaseUrl = import.meta.env.VITE_SERVER_API_URL;
    e.preventDefault();

    try {
      setError(null);
      setLoading(true);
      const res = await fetch(`${apiBaseUrl}/auth/user/register`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          confirmPassword,
        }),
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Registration failed!');
      }

      // setAuth(true);
      navigate('/user/profile'); // Navigate to profile page
    } catch (error: unknown) {
      const message = (error as { message: string }).message;
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingMessage />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  // TO DO: implement logic to redirect somewhere else
  // if (authToken) {
  //   return <p>I am logged in</p>;
  // }

  return (
    /* TO DO: 
    - check if the user is already logged in
      - if yes, redirect to homepage when they try to access the register page
    */
    <div>
      <form onSubmit={handleRegistration} className="flex flex-col gap-8 items-center m-4 p-4">
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
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </g>
          </svg>
          <input
            value={username}
            onChange={handleChange}
            name="username"
            type="text"
            id="username"
            placeholder="Username"
            required
          />
        </label>
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
        {/* TO DO: add error handling */}
        <p className="validator-hint hidden">Enter valid email address</p>
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
            // minLength={6}
            // pattern=".{6,}"
          />
        </label>
        {/* TO DO: add error handling */}
        <p className="validator-hint hidden">Password must be at least 6 characters long.</p>
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
            value={confirmPassword}
            onChange={handleChange}
            name="confirmPassword"
            type="password"
            id="confirmPassword"
            required
            placeholder="Confirm Password"
            // minLength={6}
            // pattern=".{6,}"
          />
        </label>
        {/* TO DO: add error handling */}
        <p className="validator-hint hidden">Passwords must match.</p>
        <button className="btn bg-neutral p-4" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
