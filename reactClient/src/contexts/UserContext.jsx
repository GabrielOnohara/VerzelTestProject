import { createContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import * as jwtDecode from 'jwt-decode';
import axios from "axios";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [tokenWasValidated, setTokenWasValidated] = useState(false);

  const auth = (tokenData) => {
    setToken(tokenData);
    localStorage.setItem("authToken", tokenData);
    setTokenWasValidated(true)
  };

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('authToken')
    setUser(null);
    setToken(null)
    setTokenWasValidated(true)
  };

  const refreshToken = useCallback( 
    async (lastToken) => {
      setTokenWasValidated(false)
      try {
        const response = await axios.get("http://localhost:5000/auth/token",{
          headers: {
            Authorization: 'Bearer ' + lastToken
          }
        });

        const { token } = response.data;
        auth(token)
        const { username }= jwtDecode.jwtDecode(token)
        login({username})
      } catch {
        auth(null)
        logout()
      } finally {
        setTokenWasValidated(true)
      }
  }, [])

  const verifyToken = useCallback(async () => {
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
            refreshToken(localToken)
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
  }, [refreshToken]);

  useEffect(() => {
    verifyToken()
  },[verifyToken])
  
  return (
    <UserContext.Provider value={{ user, token, login, logout, auth, verifyToken, tokenWasValidated, refreshToken }}>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserContext, UserProvider };