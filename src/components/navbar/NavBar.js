import React from 'react'
import styles from './styles.module.css'
const NavBar = () => {
  return (
    <div className={styles.navbar}>
        <span className={styles.logo}>Chat App </span>
        <div className={styles.user}>
            <img src="" alt="" className={styles.image}/>
            <span>John</span>
            <button className={styles.navbtn}>log out</button>
        </div>
    </div>
  )
}

export default NavBar