import React from 'react'
import styles from './third-party-sign-in.module.scss'
import { handleSignGoogleIn } from '../../helpers/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

const ThirdPartySignIn = ({ style, text }) => {
  return (
    <div className={`${style} ${styles.third_party_sign_in}`}>
      <div>
        {text}:
        </div>
      <div className={styles.icon_wrapper}>
        <FontAwesomeIcon className={styles.sign_in_icon} icon={faGoogle} onClick={() => handleSignGoogleIn()} />
        <FontAwesomeIcon className={styles.sign_in_icon} icon={faGoogle} onClick={() => handleSignGoogleIn()} />
        <FontAwesomeIcon className={styles.sign_in_icon} icon={faGoogle} onClick={() => handleSignGoogleIn()} />
      </div>
    </div>
  )
}

export default ThirdPartySignIn