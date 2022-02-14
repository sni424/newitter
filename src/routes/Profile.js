import { authService } from "../fBase";
import React from "react";
import { useNavigate } from "react-router-dom";

function Profile({ isLoggedIn }) {

    const navi = useNavigate();

    function OnLogOut() {
        authService.signOut();
        navi("/");
    }

    return (
        <>
            <button onClick={OnLogOut}>Log Out</button>
        </>
    );
};

export default Profile;