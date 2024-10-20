import React, { useState } from 'react'
import styles from './style.module.css'
import { UserAddOutlined } from '@ant-design/icons'
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Spin } from 'antd'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, storage, db } from '../../Firebase/firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avtar, setAvtar] = useState(null)
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);
      const data = {
        uid: res.user.uid,
        displayName,
        email,
      }
      if (file) {
        await uploadBytesResumable(storageRef, file)
        const downloadURL =await getDownloadURL(storageRef)
        await updateProfile(res.user, {
          displayName,
          photoURL: downloadURL,
        });
        //create user on firestore
        data["photoURL"] = downloadURL
        console.log("2")


      }

      await setDoc(doc(db, "users", res.user.uid), data);
      //create empty user chats on firestore
      await setDoc(doc(db, "userChats", res.user.uid), {});
      setLoading(false)
      navigate("/");
    } catch (err) {
      console.log(err)
      setErr(err.message ? err.message.replace("Firebase:", "") : "something went wrong");
      setLoading(false);
    }
  };
  const setAvtarfile = (e) => {
    setAvtar(e.target.files[0].name)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formWrapper} style={{ backgroundImage: `url("${process.env.PUBLIC_URL + '/loginbg.png'}")` }}>
        <span className={styles.logo}>Chat App</span>
        <span className={styles.title}>Register</span>
        <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
          <input type="text" className={styles.input1} placeholder='display name' required />
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
          <input type="file" id="file" style={{ display: "none" }} accept="image/*" onChange={(e) => setAvtarfile(e)} />
          <label htmlFor='file' className={styles.label}>
            {(avtar) ? avtar : <><UserAddOutlined /> Add an avatar</>}
          </label>
          <button disabled={loading} className={styles.inputbtn} >Sign Up</button>
          {loading && <Spin size="large" />}
          {err && <span className={styles.err}>{err}</span>}
        </form>
        <p> You do have a account ? <Link to="/login" style={{ fontWeight: "bold", cursor: "pointer", color: "blue" }}>Login</Link></p>
      </div>
    </div>
  )
}

export default Register