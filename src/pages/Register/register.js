import React, { useState } from 'react'
import styles from './style.module.css'
import Addimage from '../../Images/addImage.png'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import {auth,storage,db} from '../../Firebase/firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { collection, doc, setDoc } from "firebase/firestore";
const Register = () => {
const [err,setErr]=useState(false)

const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);
        const storageRef=ref(storage,displayName)
      //Create a unique image name

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
          } catch (err) {
            console.log(err);
            setErr(true);
           
          }
        });
      });
    } catch (err) {
      setErr(true);
      
    }
  };


  return (
    <div className={styles.formContainer}>
        <div className={styles.formWrapper}>
            <span className={styles.logo}>Chat App</span>
            <span className={styles.title}>Register</span>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <input type="text" className={styles.input1} placeholder='display name'/>
                <input type="email" className={styles.input2} placeholder='email' />
                <input type="password" className={styles.input3} placeholder='password' />
                <input type="file" id="file" style={{display:"none"}}/>
                <label htmlFor='file' className={styles.labal}>
                    <img src={Addimage} alt="Nan" width="50px"/>
                    <span>Add an avatar</span>
                </label>
                <button className={styles.inputbtn}>Sign Up</button>
                {err&&<span>Something went wrong</span>}
            </form>
            <p> You do have a account ? <span style={{fontWeight:"bold",cursor:"pointer"}}>Login</span></p>
        </div>
    </div>
  )
}

export default Register