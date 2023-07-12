import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/firebase";
import styles from './style.module.css'
const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className={styles.formContainer}>
    <div className={styles.formWrapper}>
        <span className={styles.logo}>Chat App</span>
        <span className={styles.title}>Register</span>
        <form onSubmit={handleSubmit}>
            <input type="email" className={styles.input2} placeholder='email' />
            <input type="password" className={styles.input3} placeholder='password' />
            <button className={styles.inputbtn}>Sign In</button>
            {err && <span>Something went wrong</span>}
        </form>
        <p> You don't have a account ? <Link to='/register' style={{fontWeight:"bold",cursor:"pointer"}}>SignUp</Link></p>
    </div>
</div>
  )
}

export default Login