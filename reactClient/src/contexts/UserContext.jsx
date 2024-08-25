import { createContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import * as jwtDecode from 'jwt-decode';

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [tokenWasValidated, setTokenWasValidated] = useState(false);

  const auth = (tokenData) => {
    setToken(tokenData);
    localStorage.setItem("authToken", tokenData);
  };

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const refreshToken = useCallback(() => {
    setTokenWasValidated(false)
    let localToken = localStorage.getItem('authToken');
    if (localToken) {
      try {
        const decodedToken = jwtDecode.jwtDecode(localToken);
        const { exp, username } = decodedToken;
  
        if (exp) {
          const currentTime = Date.now() / 1000;
          if (exp > currentTime) {
            auth(localToken);
            if(username)
              login({username})
          } else {

            auth(null)
            logout()
          }
        } else {
          console.log('Token does not have an expiration time');
        }
      } catch (error) {
        console.error('Failed to decode token', error);
      } finally {
        setTokenWasValidated(true)
      }
    }
  }, []);

  useEffect(() => {
    refreshToken()
  },[refreshToken])
  
  return (
    <UserContext.Provider value={{ user, token, login, logout, auth, refreshToken, tokenWasValidated }}>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserContext, UserProvider };