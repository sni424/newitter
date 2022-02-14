import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { collection, orderBy, query, addDoc, serverTimestamp, onSnapshot } from "firebase/firestore";
import { dbService } from "../fBase"
import Nweet from "components/Nweet";


function Home({ isLoggedIn, userObj }) {

    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    useEffect(() => {
        const q = query(collection(dbService, 'nweets'),
            orderBy("createdAt", "desc"));

        onSnapshot(q, (snapshot) => {
            const nweetArr = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setNweets(nweetArr);
        });
    }, [])

    const onSubmit = async (event) => {
        event.preventDefault();
        await addDoc(collection(dbService, "nweets"), {
            text: nweet,
            createdAt: serverTimestamp(),
            creatorId: userObj.uid,
        });
        setNweet("");
    };

    function onChange(event) {
        const { value } = event.target
        setNweet(value);
    };

    return (
        <div>
            {isLoggedIn && <Navigation></Navigation>}
            <form onSubmit={onSubmit}>
                <input onChange={onChange} value={nweet} type="text" placeholder="your message wrtie here" maxLength={120}></input>
                <input type="submit" value="Nweet"></input>
            </form>
            <div>
                {nweets.map((nweet) => {
                    return <Nweet key={nweet.id} nweet={nweet} isOwner={nweet.creatorId === userObj.uid}></Nweet>
                })}
            </div>
        </div>
    );
};

export default Home;