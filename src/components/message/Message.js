import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from '../../context/ChatContext'
import styles from './styles.module.css'
const Message = ({ message }) => {
  const {currentUser}  = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div ref={ref} className={`${styles.message} ${message.senderId === currentUser.uid && styles.owner}`}>
        <div className={styles.messageInfo}>
            <img src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          } alt="" className={styles.senderImg}/>
            <span>just now</span>
        </div>
        <div className={styles.messageContent}>
            <p className={styles.mssgpara}>{message.text}</p>
            {message.img &&<img src='' alt='' className={styles.sendImg}/>}
        </div>
    </div>
  )
}

export default Message