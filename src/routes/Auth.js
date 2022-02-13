import React, { useState } from "react";
import { authService } from "../fBase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

function Auth() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    function onChange(event) {
        const { name, value } = event.target
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data
            if (newAccount) {
                data = await createUserWithEmailAndPassword(authService, email, password);
            } else {
                data = await signInWithEmailAndPassword(authService, email, password);
            }
            console.log(data);
        } catch (error) {
            setError(error.message);
        }
    };

    function toggleAcount() {
        setNewAccount(prev => {
            return !prev
        })
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    name="email"
                    type="text"
                    placeholder="Email"
                    required value={email}
                    onChange={onChange}></input>
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required value={password}
                    onChange={onChange}></input>
                <input type="submit" value={newAccount
                    ? "Create Account"
                    : "Log in"}></input>{error}
            </form>
            <span onClick={toggleAcount}>{
                newAccount
                    ? "Log in"
                    : "Create Account"
            }</span>
            <div>
                <button name="google">Continue with Google</button>
                <button name="github">Continue with Github</button>
            </div>
        </div>
    );
};

export default Auth;