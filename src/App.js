import React, { useState } from "react";
import { ToastContainer } from 'react-toastify';

import SignInSignUp from "./page/SignInSignUp"

export default function App() {
  const [user, setUser] = useState(null);

  return <> {user ? (<h1>Logueado</h1>) : (<SignInSignUp />)}
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
  </>
}