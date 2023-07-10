import React from 'react'
import styles from './styles.module.css'
import cam from '../../Images/cam.png'
import add from '../../Images/add.png'
import more from '../../Images/more.png'
import Messages from '../messages/Messages'
import Input from '../input/Input'
const Chat = () => {
  return (
    <div className={styles.chat}>
        <div className={styles.chatInfo}>
            <span>Jane</span>
        <div className={styles.chatIcon}>
            <img className={styles.chatIconimg} src={cam} alt='' />
            <img className={styles.chatIconimg} src={add} alt='' />
            <img className={styles.chatIconimg} src={more} alt='' />
         </div>
        </div>
        <Messages />
        <Input />
        </div>
  )
}

export default Chat