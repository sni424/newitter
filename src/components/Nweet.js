import React, { useState } from "react";
import { dbService } from "../fBase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

function Nweet({ nweet, isOwner }) {

    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweet.text);
    const NweetTextRef = doc(dbService, "nweets", `${nweet.id}`);

    const onDeleteClick = async () => {
        const ok = window.confirm("정말 삭제하시겠습니까?");
        if (ok) {
            await deleteDoc(NweetTextRef);
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