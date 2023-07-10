import React from 'react'
import styles from './styles.module.css'
const Message = () => {
  return (
    <div className={`${styles.message} ${styles.owner}`}>
        <div className={styles.messageInfo}>
            <img src="" alt="" className={styles.senderImg}/>
            <span>just now</span>
        </div>
        <div className={styles.messageContent}>
            <p className={styles.mssgpara}>Hello</p>
            <img src='' alt='' className={styles.sendImg}/>
        </div>
    </div>
  )
}

export default Message