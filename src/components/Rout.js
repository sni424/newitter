<<<<<<< HEAD
import React, { useState } from "react";
import { Router, Routes, Route } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";
import Profile from "../routes/Profile"

function Rout({ isLoggedIn, userObj }) {

    return (
        <>
            <Routes>
                {isLoggedIn
                    ? (
                        <>
                            <Route exact path="/" element={<Home isLoggedIn={isLoggedIn} userObj={userObj}></Home>}>
                            </Route>
                            <Route path="/profile" element={<Profile isLoggedIn={isLoggedIn}></Profile>}>
                            </Route>
                        </>)
                    : <Route exact path="/" element={<Auth></Auth>}>
                    </Route>
                }
            </Routes>
        </>
    )
}

=======
import React, { useState } from "react";
import { Router, Routes, Route } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

function Rout({ isLoggedIn }) {

    return (
        <>
            <Routes>
                {isLoggedIn
                    ? <Route exact path="/" element={<Home></Home>}>
                    </Route>
                    : <Route exact path="/" element={<Auth></Auth>}>
                    </Route>
                }
            </Routes>
        </>
    )
}

>>>>>>> 441bebe889784f972a2539ee62e093c12bc1ca24
export default Rout;