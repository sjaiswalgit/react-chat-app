import React from 'react'
import styles from './style.module.css'
const Login = () => {
  return (
    <div className={styles.formContainer}>
    <div className={styles.formWrapper}>
        <span className={styles.logo}>Chat App</span>
        <span className={styles.title}>Register</span>
        <form>
            <input type="email" className={styles.input2} placeholder='email' />
            <input type="password" className={styles.input3} placeholder='password' />
            <button className={styles.inputbtn}>Sign In</button>
        </form>
        <p> You don't have a account ? <span style={{fontWeight:"bold",cursor:"pointer"}}>SignUp</span></p>
    </div>
</div>
  )
}

export default Login