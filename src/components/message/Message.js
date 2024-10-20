import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from '../../context/ChatContext'
import styles from './styles.module.css'
const Message = ({ message }) => {
  const [mssgTime,setmssgTime]=useState()
  const {currentUser}  = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    const date=message.date.seconds*1000;
    const currentTimestamp= Date.now();

    if((currentTimestamp-date)/1000<60)
    {setmssgTime("just now")}
    else if((currentTimestamp-date)/1000<3600)
    {setmssgTime(Math.floor((currentTimestamp-date)/60000)+"min ago")}
    else if((currentTimestamp-date)/1000<3600*24)
    {setmssgTime(Math.floor((currentTimestamp-date)/3600000)+"hrs ago")}
    else
    {const formatedDate = new Date(date).toLocaleString(
      "en-US",
        {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }
    );
      setmssgTime(formatedDate)}

  }, [message]);

  return (
    <div ref={ref} className={`${styles.message} ${message.senderId === currentUser.uid && styles.owner}`}>
        <div className={styles.messageInfo}>
            <img src={
            message.senderId === currentUser.uid
              ? (currentUser?.photoURL || '/react-chat-app/blankdp.jpg')
              :( data.user?.photoURL || '/react-chat-app/blankdp.jpg')
          } alt="" className={styles.senderImg}/>
            <span>{mssgTime}</span>
        </div>
        <div className={styles.messageContent}>
            <p className={styles.mssgpara}>{message.text}</p>
            {message.img &&<img src={message.img} alt='' className={styles.sendImg}/>}
        </div>
    </div>
  )
}

export default Message