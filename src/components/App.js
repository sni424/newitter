import React, { useEffect, useState } from "react";
import Rout from "./Rout";
import fBase from "../fBase";
import { authService } from "../fBase";


function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [changeName, setChangeName] = useState(false);

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

  const refreshUSer = () => {
    setChangeName(prev => !prev)
  }

  return (
    <div>
      {init ?
        <Rout isLoggedIn={isLoggedIn} userObj={userObj} refreshUSer={refreshUSer}></Rout>
        : "false"}
    </div>
  );
}

export default App;
