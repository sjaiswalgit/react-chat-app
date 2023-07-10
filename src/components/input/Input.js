import React from 'react'
import styles from './styles.module.css'
import attact from '../../Images/attach.png'
import add from '../../Images/addImage.png'
const Input = () => {
  return (
    <div className={styles.input}>
        <input type='text' placeholder='Type something...' className={styles.typemssg} />
        <div className={styles.sent}>
            <img src={attact} alt='' className={styles.sentImg}/>
            <input type='file' style={{display:'none'}} id='file' />
            <label htmlFor='file'>
                <img src={add} alt="" className={styles.sentImg}/>
            </label>
            <button className={styles.sendbtn}>send</button>
        </div>
    </div>
  )
}

export default Input