import React, { useState } from "react";

import SignInSignUp from "./page/SignInSignUp"

export default function App() {
  const [user, setUser] = useState(null);

  return <> {user ? (<h1>Logueado</h1>) : (<SignInSignUp />)} </>
}