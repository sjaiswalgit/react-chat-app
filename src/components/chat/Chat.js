import React, { useContext } from "react";
import styles from './styles.module.css'
import more from '../../Images/more.png'
import Messages from '../messages/Messages'
import Input from '../input/Input'
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import { ChatContext } from "../../context/ChatContext";
import { ToggleContext } from "../../context/ToggleContext";
import { Dropdown } from "antd"
import { ClearOutlined } from "@ant-design/icons";
const Chat = () => {
  const { data } = useContext(ChatContext);
  const { data1, dispatch1 } = useContext(ToggleContext)
  const clearChat = async () => {
    await setDoc(doc(db, "chats", data.chatId), {
      messages: []
    });
  }
  const moveSlide = () => {
    dispatch1({ type: "Nav_Toggle", payload: true })
  }
  return (
    <div className={styles.chat}>
      <div className={styles.chatInfo}>
        <div className={styles.arroy} onClick={moveSlide}>
          {Object.keys(data.user).length !== 0 ?
            <img className={styles.userimg}
              src={data.user?.photoURL || '/react-chat-app/blankdp.jpg'}
              alt="" onError={(e) => { e.target.src = '/react-chat-app/blankdp.jpg'; }} /> :
            <></>}
          <span> &#8594;</span></div>
        <span>{data.user?.displayName}</span>
        <Dropdown menu={{
          items:
            [
            {
              key: '1',
              label: (<span onClick={() => clearChat()}>Clear Chats</span>),
              extra: <ClearOutlined />,
            }]
        }} placement='bottomRight'>
          <img className={styles.chatIconimg} src={more} alt='' />
        </Dropdown>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat