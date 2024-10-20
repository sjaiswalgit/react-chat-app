import React, { useEffect, useContext } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Chat from '../../components/chat/Chat';
import styles from './styles.module.css';
import { ToggleContext } from '../../context/ToggleContext';

const Home = () => {
  const { data1, dispatch1 } = useContext(ToggleContext);

  const checksize = () => {
    if (window.innerHeight > window.innerWidth) {
      dispatch1({ type: 'Resize', payload: true });
    } else {
      dispatch1({ type: 'Resize', payload: false });
    }
  };

  useEffect(() => {
    window.addEventListener('resize', checksize);
    return () => {
      window.removeEventListener('resize', checksize);
    };
  }, []);

  return (
    <div className={styles.homepage}>
      <div
        className={data1.toggle ? styles.box : styles.container}
        style={{ backgroundImage: `url("${process.env.PUBLIC_URL + '/chatbg.png'}")` }}
      >
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
