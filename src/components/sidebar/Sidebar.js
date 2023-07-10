import React from 'react'
import styles from './styles.module.css'
import NavBar from '../navbar/NavBar'
import SearchBar from '../search/SearchBar'
import Chats from '../chats.js/Chats'
const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
        <NavBar />
        <SearchBar />
       <Chats />
       </div>
  )
}

export default Sidebar