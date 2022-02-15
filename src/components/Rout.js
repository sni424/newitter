import React, { useState } from "react";
import { Router, Routes, Route } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";
import Profile from "../routes/Profile"

function Rout({ isLoggedIn, userObj, refreshUSer }) {

    return (
        <>
            <Routes>
                {isLoggedIn
                    ? (
                        <>
                            <Route exact path="/" element={<Home isLoggedIn={isLoggedIn} userObj={userObj}></Home>}>
                            </Route>
                            <Route path="/profile" element={<Profile isLoggedIn={isLoggedIn} userObj={userObj} refreshUSer={refreshUSer}></Profile>}>
                            </Route>
                        </>)
                    : <Route exact path="/" element={<Auth></Auth>}>
                    </Route>
                }
            </Routes>
        </>
    )
}

export default Rout;