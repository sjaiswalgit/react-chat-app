import React, { useEffect } from 'react'
import styles from './styles.module.css'
import { useContext, useState } from "react";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import { AuthContext } from "../../context/AuthContext";

const SearchBar = (props) => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const userdata=[]
      querySnapshot.forEach((doc) => {
        const word= new RegExp(username,"i")
        const find= doc.data().displayName.search(word)
        if(find!==-1)
        {userdata.push(doc.data())}
      });
     
      setUser(userdata)

    } catch (err) {
      console.log(err)
      setErr(true);
    }
  }


  const handleSelect = async (e) => {
    console.log("selected")
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > e.uid
        ? currentUser.uid + e.uid
        : e.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        const tes = await getDoc(doc(db, "userChats", currentUser.uid));
        const nes = await getDoc(doc(db, "userChats", e.uid));
        if (!tes.exists()) {
          //create a chat in chats collection
          await setDoc(doc(db, "userChats", currentUser.uid), { });}
          
        if (!nes.exists()) {
          //create a chat in chats collection
          await setDoc(doc(db, "userChats", e.uid), { });}

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: e.uid,
            displayName: e.displayName,
            photoURL: e.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", e.uid), {
         [ combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) { console.log(err)}

    setUser(null);
    setUsername("")
  };
function setSearchDefault(){
  setUser(null);
  setUsername("")
}
useEffect(()=>{
  console.log(props.searchDef)
    setSearchDefault()
    props.setsearchDef(false)
    
}, [props.searchDef])


 
  return (
    <div className={styles.search}>
      <div className={styles.searchForm} >
        <input type="text" className={styles.searchInp} placeholder='Find a user & select eg:suresh,ramesh,amit.. ' 
          onChange={(e) => {setUsername(e.target.value); handleSearch(); console.log(e.target.value)}}
          value={username}/>
      </div>
      
      {err && <span>User not found!</span>}
      {user && (
        user.map((e)=>{return(
      <div className={styles.userChat} onClick={()=>handleSelect(e)}>
        <img className={styles.userImage} src={e.photoURL} alt="Nan" />
        <div  className={styles.userChatInfo}>
          <span>{e.displayName}</span>
        </div>
      </div>
      )}) )}
     
      </div>
  )
}

export default SearchBar