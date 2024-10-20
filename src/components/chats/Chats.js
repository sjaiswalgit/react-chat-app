import React from 'react'
import styles from './styles.module.css'
import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { ToggleContext } from '../../context/ToggleContext';
import { db } from "../../Firebase/firebase";
const Chats = () => {
  const [chats, setChats] = useState([]);
  const {dispatch1}=useContext(ToggleContext)
  const { currentUser } = useContext(AuthContext);
  const { data,dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (document) => {
        const chatsresult=document.data()?document.data():{}
        const chatarr= Object.entries(chatsresult).sort((a,b)=>{console.log(a[1].date,b[1].date); return b[1].date - a[1].date})
        console.log("ff")
        const chatdata= chatarr?chatarr:[]
        setChats(chatdata);
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();

  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  console.log(data.user.uid)

  return (
    <div className={styles.chats} >
       {chats.map((chat) => (
        <div className={data.user.uid===chat[1].userInfo.uid?styles.activeUserChat:styles.userChat} key={chat[0]}
        onClick={() =>{ handleSelect(chat[1].userInfo); dispatch1({type:"Nav_Toggle",payload:false})}} >
        <img className={styles.userImage} src={chat[1].userInfo?.photoURL || '/react-chat-app/blankdp.jpg'} alt="Nan" />
        <div  className={styles.userChatInfo}>
          <span className={styles.username}>{chat[1].userInfo.displayName}</span>
          <p className={styles.lastmssg}>{chat[1].lastMessage?.text}</p>
        </div>
      </div>
        ))}
    </div>
  )
}

export default Chats