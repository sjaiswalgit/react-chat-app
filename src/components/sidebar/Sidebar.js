import React, { useState } from 'react'
import styles from './styles.module.css'
import NavBar from '../navbar/NavBar'
import SearchBar from '../search/SearchBar'
import Chats from '../chats.js/Chats'
const Sidebar = () => {
  const [searchDef,setsearchDef]=useState(false)
  
  return (
    <div className={styles.sidebar} onClick={()=>{setsearchDef(true);}}>
        <NavBar />
        <SearchBar  setsearchDef={setsearchDef} searchDef={searchDef}/>
       <Chats  />
       </div>
  )
}

export default Sidebar