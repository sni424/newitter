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

export default Rout;