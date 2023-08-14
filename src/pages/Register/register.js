import React, { useState } from 'react'
import styles from './style.module.css'
import Addimage from '../../Images/add.png'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import {auth,storage,db} from '../../Firebase/firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avtar,setAvtar]=useState(null)
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
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };
  const setAvtarfile=(e)=>{
    setAvtar(e.target.files[0].name)
  }

  
  return (
    <div className={styles.formContainer}>
        <div className={styles.formWrapper} style={{backgroundImage:`url("${process.env.PUBLIC_URL +'loginbg.png'}")`}}>
            <span className={styles.logo}>Chat App</span>
            <span className={styles.title}>Register</span>
            <form onSubmit={(e)=>handleSubmit(e)} className={styles.form}>
                <input type="text" className={styles.input1} placeholder='display name'/>
                <input type="email" className={styles.input2} placeholder='email' />
                <input type="password" className={styles.input3} placeholder='password'  />
                <input type="file" id="file" style={{display:"none"}} onChange={(e)=>setAvtarfile(e)}/>
                <label htmlFor='file' className={styles.labal}>
                    <img src={Addimage} alt="Nan" width="30rem"/>
                    <span>{(avtar)?avtar:<>Add an avatar</>}</span>
                </label>
                <button disabled={loading} className={styles.inputbtn}>Sign Up</button>
                {loading && "Uploading and compressing the image please wait..."}
                {err&&<span>Something went wrong</span>}
            </form>
            <p> You do have a account ? <Link to="/login" style={{fontWeight:"bold",cursor:"pointer",color:"rgb(230, 67, 94)"}}>Login</Link></p>
        </div>
    </div>
  )
}

export default Register