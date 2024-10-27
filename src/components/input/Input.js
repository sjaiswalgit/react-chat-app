import React, { useContext, useEffect, useState } from "react";
import styles from './styles.module.css'
import { Input } from "antd";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { SendOutlined, PlusOutlined } from "@ant-design/icons";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../Firebase/firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const InputBox = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [imageURL, setImageURL] = useState(null)
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);


  useEffect(() => {
    if (img) {
      const imgURL = URL.createObjectURL(img)
      setImageURL(imgURL)
    }
  }, [img])


  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      await uploadBytesResumable(storageRef, img).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          }
          catch (err) { console.log(err) }
        });

      }
      );

    }

    else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }
    setText("");

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });


    setImg(null);
  };
  return (
    <div className={styles.input}>
      <input type='file' accept="image/*" style={{ display: 'none' }} id='file' onChange={(e) => setImg(e.target.files[0])} />
      <label htmlFor='file' className={styles.imageAdd}>
        <PlusOutlined style={{ fontSize: '1.5rem' }} />
      </label>
      <Input type='text' placeholder='Type something...' onChange={(e) => setText(e.target.value)
      } onKeyDown={(e) => { if (e.key === "Enter") { handleSend() } }} disabled={(data.chatId === "null")}
        value={text} />
      <div className={styles.sent}>
        <button className={styles.sendbtn} onClick={handleSend}> <SendOutlined style={{ fontSize: '2rem' }} /></button>
        <figure className={(img ? styles.sendpic : styles.nopic)}>
          <img src={imageURL} height="100px" alt="" />
        </figure>
      </div>
    </div>
  )
}

export default InputBox