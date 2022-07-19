import React from "react";

import styles from './UserCard.module.scss'
import photoPlaceholder from '../../assets/img/photo.png';

const UserCard = ({ user }) => {

  function formatPhoneNumber(phoneNumber) {
    var cleaned = ('' + phoneNumber).replace(/\D/g, '')
    let match = cleaned.match(/^(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})$/)
    if (match) {
      return '+' + match[1] + ' (' + match[2] + ') ' + match[3] + ' ' + match[4] + ' ' + match[5]
    }
    return 'Wrong phone number'
  }

  return (
    <div className={styles.root}>
      <img src={user.photo} onError={e => e.target.src = photoPlaceholder} alt={user.photo} />
      <div className={styles.tooltip}>
        <p className={styles.name}>{user.name}</p>
        <p className={styles.tooltip__text}>{user.name}</p>
      </div>
      <div>
        <p>{user.position}</p>
        <div className={styles.tooltip}>
          <p>{user.email}</p>
          <p className={styles.tooltip__text}>{user.email}</p>
        </div>
        <p>{formatPhoneNumber(user.phone)}</p>
      </div>
    </div>
  )
}

export default UserCard;