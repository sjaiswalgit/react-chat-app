import React from 'react'
import styles from './styles.module.css'
import Message from '../message/Message'
const Messages = () => {
  return (
    <div className={styles.messages}>
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
    </div>
  )
}

export default Messages