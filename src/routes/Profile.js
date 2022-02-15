import { authService } from "../fBase";
import React, { useEffect, useState } from "react";
import Navigation from "components/Navigation";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { dbService } from "../fBase"
import { getAuth, updateProfile } from "firebase/auth";

function Profile({ refreshUSer, isLoggedIn, userObj }) {

    const navi = useNavigate();
    const [newName, setNewName] = useState(userObj.displayName);
    function OnLogOut() {
        authService.signOut();
        navi("/");
    }

    const getMyNweets = async () => {
        const q = query(
            collection(dbService, "nweets"),
            where("creatorId", "==", userObj.uid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
        });
    };

    function onChange(e) {
        const { value } = e.target
        console.log(value);
        setNewName(value);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newName) {
            await updateProfile(userObj, { displayName: newName });
        }
        refreshUSer();
    }

    useEffect(() => {
        getMyNweets();
    }, [])

    return (
        <>
            {isLoggedIn && <Navigation userObj={userObj}></Navigation>}
            <form onSubmit={onSubmit}>
                <input type="text" onChange={onChange} value={newName}></input>
                <input type="submit" value="Update"></input>
            </form>
            <button onClick={OnLogOut}>{userObj.displayName}Log Out</button>
        </>
    );
};

export default Profile;