import React, { useEffect, useState, useRef } from "react";
import Navigation from "../components/Navigation";
import Nweet from "../components/Nweet"
import { v4 as uuidv4 } from "uuid";
import { collection, orderBy, query, addDoc, serverTimestamp, onSnapshot } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { dbService, storageService } from "../fBase"


function Home({ isLoggedIn, userObj }) {

    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState("");
    const fileinput = useRef();

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
        let attachmentUrl = "";
        if (attachment !== "") {
            const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
            const response = await uploadString(fileRef, attachment, "data_url");
            attachmentUrl = await getDownloadURL(response.ref);
        }
        const nweetPosting = {
            text: nweet,
            createdAt: serverTimestamp(),
            creatorId: userObj.uid,
            attachmentUrl,
        };
        await addDoc(collection(dbService, "nweets"), nweetPosting);
        setNweet("");
        setAttachment("");
    };

    function onChange(event) {
        const { value } = event.target
        setNweet(value);
    };

    function onFileChage(e) {
        const { files } = e.target;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (e) => {
            const { result } = e.currentTarget
            setAttachment(result);
        }
        if (theFile) {
            reader.readAsDataURL(theFile);
        }
    }

    function onClearPhotoClick() {
        fileinput.current.value = "";
        setAttachment("");
    }

    return (
        <div>
            {isLoggedIn && <Navigation userObj={userObj}></Navigation>}
            <form onSubmit={onSubmit}>
                <input onChange={onChange} value={nweet} type="text" placeholder="your message wrtie here" maxLength={120}></input>
                <input type="file" accept="image/*" onChange={onFileChage} ref={fileinput}></input>
                <input type="submit" value="Nweet"></input>
                {attachment &&
                    <div>
                        <img src={attachment} width="50px" height="50px"></img>
                        <button onClick={onClearPhotoClick}>Cancel upload</button>
                    </div>}
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