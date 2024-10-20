import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Spin } from 'antd'
import { auth } from "../../Firebase/firebase";
import styles from './style.module.css'
const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      setLoading(true)
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false)
      navigate("/")
    } catch (err) {
      setLoading(false)
      setErr(err.message.replace("Firebase:", ""));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formWrapper} style={{ backgroundImage: `url("${process.env.PUBLIC_URL + '/loginbg.png'}")` }}>
        <span className={styles.logo}>Chat App</span>
        <span className={styles.title}>Login</span>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="email" className={styles.input2} placeholder='email' required />
          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"} // Conditional type
              className={styles.input3}
              placeholder="password"
              required
            />
            <span onClick={togglePasswordVisibility} className={styles.passwordToggle}>
              {showPassword ? <EyeOutlined style={{ fontSize: '1.4rem' }} /> : <EyeInvisibleOutlined style={{ fontSize: '1.4rem' }} />} {/* Toggle icons */}
            </span>
          </div>
          <button className={styles.inputbtn} disabled={loading} >Sign In</button>
          {loading && <Spin size="large" />}
          {err && <span className={styles.err}>{err}</span>}
        </form>
        <p> You don't have a account ? <Link to='/register' style={{ fontWeight: "bold", cursor: "pointer", color: "blue" }}>SignUp</Link></p>
      </div>
    </div>
  )
}

export default Login