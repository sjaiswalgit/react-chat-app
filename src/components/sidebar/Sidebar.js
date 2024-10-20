import React, { useState ,useContext} from 'react'
import styles from './styles.module.css'
import NavBar from '../navbar/NavBar'
import SearchBar from '../search/SearchBar'
import Chats from '../chats/Chats'
import { ToggleContext } from '../../context/ToggleContext'
const Sidebar = (props) => {
  const [searchDef,setsearchDef]=useState(false)
  const {data1,dispatch1}=useContext(ToggleContext)
  return (
    <div className={data1.toggle?(data1.navtoggle?styles.slidebar:styles.minimize):styles.sidebar} onClick={()=>{setsearchDef(true)}}>
        <NavBar />
        <SearchBar  setsearchDef={setsearchDef} searchDef={searchDef}/>
       <Chats  />
       </div>
  )
}

export default Sidebar