import React, { useEffect } from 'react'
import styles from './styles.module.css'
import { useContext, useState } from "react";
import {
  collection,
  getDocs,
  setDoc,
  query,
  where,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import { AuthContext } from "../../context/AuthContext";

const SearchBar = (props) => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState([]);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async (username) => {
    try {
      if(username){
      // Use Firebase's where clause to filter results on the server-side
      const userQuery = query(
        collection(db, "users"),
        where("displayName", "<=", username + "\uf8ff") // For case-insensitive search with prefix match
      );
      
      const querySnapshot = await getDocs(userQuery);
      const userdata = [];
  
      querySnapshot.forEach((doc) => {
        if(currentUser.uid != doc.data().uid && doc.data().displayName.search(new RegExp(username, 'i'))!=-1)
        userdata.push(doc.data());
      });
  
      setUser(userdata);
    }else{
    setUser([])
    }
    } catch (err) {
      console.log(err);
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
        let info= {
          uid: e.uid,
          displayName: e.displayName,
        }
        if(e.photoURL){
          info["photoURL"]=e.photoURL
        }
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]:info,
          [combinedId + ".date"]: serverTimestamp(),
        });

        let info2={
          uid: currentUser.uid,
          displayName: currentUser.displayName,
        }
        if(currentUser.photoURL){
          info2["photoURL"]=currentUser.photoURL
        }
        await updateDoc(doc(db, "userChats", e.uid), {
         [ combinedId + ".userInfo"]:info2 ,
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
  
    setSearchDefault()
    props.setsearchDef(false)
    
}, [props.searchDef])



 
  return (
    <div className={styles.search}>
      <div className={styles.searchForm} >
        <input type="text" className={styles.searchInp} placeholder='Search a user eg:suresh,ramesh,amit.. ' 
          onChange={(e) => {setUsername(e.target.value); handleSearch(e.target.value);}}
          value={username}/>
      </div>
      
      {err && <span>User not found!</span>}
      {user && (
        user.map((e,index)=>{return(
      <div className={styles.userChat} key={index} onClick={()=>handleSelect(e)}>
        <img className={styles.userImage} src={e?.photoURL || '/react-chat-app/blankdp.jpg'} alt="Nan" />
        <div  className={styles.userChatInfo}>
          <span>{e.displayName}</span>
        </div>
      </div>
      )}) )}
     
      </div>
  )
}

export default SearchBar