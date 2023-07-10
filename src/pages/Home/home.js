import React from 'react'
import styles from './styles.module.css'
import Sidebar from '../../components/sidebar/Sidebar'
import Chat from '../../components/chat/Chat'
const Home = () => {
  return (
    <div className={styles.homepage}>
       <div className={styles.container}>
      <Sidebar />
      <Chat />
        </div> 
     </div>
  )
}

export default Home