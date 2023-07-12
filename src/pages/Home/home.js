import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Chat from '../../components/chat/Chat'
import styles from './styles.module.css'
const Home = () => {
  return (
    <div className={styles.homepage}>
      <div className={styles.container}>
        <Sidebar/> 
        <Chat/>
      </div>
    </div>
  )
}

export default Home