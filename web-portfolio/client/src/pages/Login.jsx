import { useState, useEffect } from 'react';
import icon from '/face_co.svg';
import MainButton from '../components/MainButton';
import axios from '../axios-config';
import '../styles/login.css';

function Login() {
  const MAX_LOGIN_ATTEMPTS = 3;
  const LOGIN_LOCKOUT_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds
  const LOGIN_ATTEMPTS_KEY = 'loginAttempts';
  const LOGIN_LOCKED_UNTIL_KEY = 'loginLockedUntil';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(Number(localStorage.getItem(LOGIN_ATTEMPTS_KEY)) || 0);
  const [loginLockedUntil, setLoginLockedUntil] = useState(Number(localStorage.getItem(LOGIN_LOCKED_UNTIL_KEY)) || 0);

  const isLoginDisabled = loginAttempts >= MAX_LOGIN_ATTEMPTS && Date.now() < loginLockedUntil;

  const handleSignIn = async () => {
    try {
      const response = await axios.post('/api/users', { username, password });
      const data = response.data;
      console.log(data.user);
      // Redirect user to /admin here
    } catch (err) {
      setLoginAttempts(loginAttempts + 1);
      localStorage.setItem(LOGIN_ATTEMPTS_KEY, loginAttempts + 1);
      if (loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS) {
        const lockedUntil = Date.now() + LOGIN_LOCKOUT_TIME;
        setLoginLockedUntil(lockedUntil);
        localStorage.setItem(LOGIN_LOCKED_UNTIL_KEY, lockedUntil);
      }
      alert(err.response.data.message);
    }
  };

  useEffect(() => {
    if (isLoginDisabled) {
      const timer = setTimeout(() => {
        setLoginLockedUntil(0);
        localStorage.removeItem(LOGIN_ATTEMPTS_KEY);
        localStorage.removeItem(LOGIN_LOCKED_UNTIL_KEY);
        setLoginAttempts(0);
      }, loginLockedUntil - Date.now());
      return () => clearTimeout(timer);
    }
  }, [isLoginDisabled, loginLockedUntil]);

  return (
    <div className="login form">
      <img src={icon} alt="User Avatar" />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={isLoginDisabled}
        className={isLoginDisabled ? 'disabled' : ''}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoginDisabled}
        className={isLoginDisabled ? 'disabled' : ''}
      />
      <MainButton type="special" handleClick={handleSignIn} disabled={isLoginDisabled}>
        Sign In
      </MainButton>
      {isLoginDisabled && (
        <p>
          Too many failed login attempts. Please try again in {Math.ceil((loginLockedUntil - Date.now()) / 1000 / 60)} minutes.
        </p>
      )}
    </div>
  );
}

export default Login;
