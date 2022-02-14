import React, { useEffect, useState } from "react";
import Rout from "./Rout";
import fBase from "../fBase";
import { authService } from "../fBase";


function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  }, [])

  return (
    <div>
      {init ?
        <Rout isLoggedIn={isLoggedIn} userObj={userObj}></Rout>
        : "false"}
      <footer>
        &copy; {new Date().getFullYear()} Nwitter
      </footer>
    </div>
  );
}

export default App;
