import React from 'react'
import styles from './styles.module.css'
const SearchBar = () => {
  return (
    <div className={styles.search}>
      <div className={styles.searchForm} >
        <input type="text" className={styles.searchInp} placeholder='Find a user'/>
      </div>
      <div className={styles.userChat}>
        <img className={styles.userImage} src="" alt="Nan" />
        <div  className={styles.userChatInfo}>
          <span>Jane</span>
        </div>
      </div>
      </div>
  )
}

export default SearchBar