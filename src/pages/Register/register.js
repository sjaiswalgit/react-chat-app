import React from 'react'
import styles from './style.module.css'
import Addimage from '../../Images/addImage.png'
const Register = () => {
  return (
    <div className={styles.formContainer}>
        <div className={styles.formWrapper}>
            <span className={styles.logo}>Chat App</span>
            <span className={styles.title}>Register</span>
            <form>
                <input type="text" className={styles.input1} placeholder='display name'/>
                <input type="email" className={styles.input2} placeholder='email' />
                <input type="password" className={styles.input3} placeholder='password' />
                <input type="file" id="file" style={{display:"none"}}/>
                <label htmlFor='file' className={styles.labal}>
                    <img src={Addimage} alt="Nan" width="50px"/>
                    <span>Add an avatar</span>
                </label>
                <button className={styles.inputbtn}>Sign Up</button>
            </form>
            <p> You do have a account ? <span style={{fontWeight:"bold",cursor:"pointer"}}>Login</span></p>
        </div>
    </div>
  )
}

export default Register