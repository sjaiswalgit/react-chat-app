import styles from './styles.module.css';
import React, { useContext } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../Firebase/firebase';
import { AuthContext } from '../../context/AuthContext';
import { Dropdown } from "antd"
import { LogoutOutlined } from '@ant-design/icons';
const NavBar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className={styles.navbar}>
      <span className={styles.logo}>Chat App</span>
      <div className={styles.user}>
        <span>{currentUser.displayName}</span>
        <Dropdown  menu={{items:
          [{
            key: '1',
            label: 'My Account',
            disabled: true,
          },
          {
            type: 'divider',
          },
          {
            key: '2',
            label: (<span onClick={()=>signOut(auth)}>Log Out</span>),
            extra: <LogoutOutlined />,
          }] }} placement='bottomRight'>
          <img style={{ cursor: 'pointer' }} src={currentUser?.photoURL || '/react-chat-app/blankdp.jpg'} alt="User Avatar" onError={(e) => e.target.src = '/react-chat-app/blankdp.jpg'} className={styles.image} />
        </Dropdown>
      </div>
    </div>
  );
};

export default NavBar;
