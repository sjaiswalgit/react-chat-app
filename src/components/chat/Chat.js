import React, { useContext } from "react";
import styles from './styles.module.css'
import more from '../../Images/more.png'
import Messages from '../messages/Messages'
import Input from '../input/Input'
import { setDoc,doc } from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import { ChatContext } from "../../context/ChatContext";
const Chat = () => {
  const { data } = useContext(ChatContext);

  const clearChat= async()=>{

  await setDoc(doc(db, "chats", data.chatId), {
    messages:[]
  });}

  return (
    <div className={styles.chat}>
        <div className={styles.chatInfo}>
        <img className={styles.userimg} src={data.user?.photoURL} alt="" />
        <span>{data.user?.displayName}</span>
        <div className={styles.chatIcon}>
            <img className={styles.chatIconimg} src={more} alt=''  />
            <div className={styles.clearchat } onClick={()=>clearChat()}>Clear chat</div>
         </div>
        </div>
        <Messages />
        <Input />
        </div>
  )
}

export default Chat