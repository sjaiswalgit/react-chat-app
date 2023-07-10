import React from 'react'
import styles from './styles.module.css'
const Chats = () => {
  return (
    <div className={styles.chats}>
        <div className={styles.userChat}>
        <img className={styles.userImage} src="" alt="Nan" />
        <div  className={styles.userChatInfo}>
          <span className={styles.username}>Jane</span>
          <p className={styles.lastmssg}>Hello</p>
        </div>
      </div>
    </div>
  )
}

export default Chats