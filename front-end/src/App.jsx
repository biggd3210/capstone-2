

// package imports
import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import jwt from "jsonwebtoken";
import { quantum } from 'ldrs';

//Component imports
import Routes from './views/Routes';
import NavBar from './components/NavBar';

// API
import FacilityAssistApi from './api/api';

//Helper imports
import useLocalStorage from "./hooks/useLocalStorage";
import UserContext from "./auth/UserContext";

//CSS imports
import './App.css';

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "facility-assist-token";

quantum.register();

function App() {

  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  /** Load user info from API. Until a user is logged in and they have a token, this should not run. It only needs to re-run when a user a logs out, so the value of the token is a dependency for this effect. */

  useEffect(function loadUserInfo() {
    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          // put the token on the API class so it can use it to call the API.
          FacilityAssistApi.token = token;
          let currentUser = await FacilityAssistApi.getCurrentUser(username);
          setCurrentUser(currentUser);
        } catch (err) {
          console.error("App loadUserInfo: problem loading user", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }

    /** set infoLoaded to false while async getCurrentUser runs. Once the data is fetched (or even if an error occurs), this will be set back to false to control the spinner. */
    setInfoLoaded(false);
    getCurrentUser();
  }, [token])

  /** Handles site-wide logout
   * 
   */
  async function logout() {
    setCurrentUser(null);
    setToken(null);
  }
  /** Handles site-wide login.
   *
   */

  async function login(loginData) {
    try {
      let token = await FacilityAssistApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }
  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{ currentUser, setCurrentUser }}
      >
        <div className='App'>
          <NavBar logout={logout} />
          <main>
            <Routes login={login} info={infoLoaded} />
          </main>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  )
}

export default App
