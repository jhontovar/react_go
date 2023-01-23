import React, { useState, useEffect } from "react";
import { ToastContainer } from 'react-toastify';

import SignInSignUp from "./page/SignInSignUp"
import { AuthContext } from "./util/contexts"
import { isUserLogin } from "./api/auth"
import Routing from "./routers/Routing"

export default function App() {
  const [user, setUser] = useState(null);
  const [loadUser, setLoadUser] = useState(false);
  const [refreshCheckLogin, setRefreshCheckLogin] = useState(false)

  useEffect(() => {
    setUser(isUserLogin());
    setRefreshCheckLogin(false);
    setLoadUser(true);
  }, [refreshCheckLogin])

  if (!loadUser) { return null }

  return (<AuthContext.Provider value={user}>
    {user ?
      (<Routing />) : (<div><SignInSignUp setRefreshCheckLogin={setRefreshCheckLogin} /></div>)
    }
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnVisibilityChange
      draggable
      pauseOnHover
    />
  </AuthContext.Provider>
  );
}