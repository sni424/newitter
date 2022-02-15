import React, { useState } from "react";
import { dbService, storageService } from "../fBase";
import { doc, deleteDoc, updateDoc, getFirestore } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
function Nweet({ nweet, isOwner }) {

    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweet.text);
    const NweetTextRef = doc(dbService, "nweets", `${nweet.id}`);

    const onDeleteClick = async () => {
        const ok = window.confirm("정말 삭제하시겠습니까?");
        if (ok) {
            await deleteDoc(doc(getFirestore(), `nweets/${nweet.id}`));
            await deleteObject(ref(storageService, nweet.attachmentUrl));;
        }
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        await updateDoc(NweetTextRef, {
            text: newNweet,
        });
        setEditing(false);
    }

    function toggleEditing() {
        setEditing(!editing)
    }
    function onChange(e) {
        const { value } = e.target
        setNewNweet(value);
    }

    return (
        <>
            <div>
                {editing
                    ? (
                        <>
                            <form onSubmit={onSubmit}>
                                <input
                                    type="text"
                                    value={newNweet}
                                    required
                                    onChange={onChange}
                                ></input>
                                <input type="submit" value="수정완료"></input>
                            </form>
                            <button onClick={toggleEditing}>수정</button>
                        </>)
                    : <>
                        <h4>{nweet.text}</h4>
                        {nweet.attachmentUrl &&
                            <img src={nweet.attachmentUrl} width="50px" height="50px"></img>}
                        {isOwner && (
                            <>
                                <button onClick={onDeleteClick}>❌</button>
                                <button onClick={toggleEditing}>✅</button>
                            </>
                        )}
                    </>
                }
            </div>
        </>
    );
};

export default Nweet;