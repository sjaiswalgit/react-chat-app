import styles from './styles.module.css'
import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../../Firebase/firebase'
import { AuthContext } from '../../context/AuthContext'

const NavBar = () => {
  const {currentUser} = useContext(AuthContext)
  return (
    <div className={styles.navbar}>
        <span className={styles.logo}>Chat App </span>
        <div className={styles.user}>
            <img src={currentUser.photoURL} alt="" className={styles.image}/>
            <span >{currentUser.displayName}</span>
            <button className={styles.navbtn} onClick={()=>signOut(auth)}>log out</button>
        </div>
    </div>
  )
}

export default NavBar