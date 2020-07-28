import React, { useState, useEffect, useContext } from 'react'
import styles from './right-menu.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { handleSignOut } from '../../helpers/auth'
import { AppContext } from '../../providers/app-provider'
import ThirdPartySignIn from '../authentication/third-party-sign-in'
import SignInEmail from '../authentication/sign-in-email'
import Profile from './profile'
import { useRouter } from 'next/router'

const RightMenu = () => {
  const { isAuthed, authLoading } = useContext(AppContext)
  const [showMenu, setShowMenu] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setShowMenu(false)
  }, [router.pathname])


  return (
    <div className={styles.right_menu}>
      <FontAwesomeIcon size="lg" className={styles.toggle} icon={faBars} onClick={() => setShowMenu(true)} />
      <div className={`${styles.menu} ${showMenu ? styles.open : ''}`} >
        <div className={styles.close} onClick={() => setShowMenu(false)}>
          <FontAwesomeIcon className={styles.close_icon} icon={faChevronRight} />
        </div>
        {!authLoading && !isAuthed ?
          <React.Fragment>
            <SignInEmail />
            <ThirdPartySignIn style="dark" text="sign in other ways" />
          </React.Fragment>
          :
          <React.Fragment>
            <Profile />
          </React.Fragment>
        }

        <div className={styles.logout}>
          {!authLoading && isAuthed ? <button onClick={() => handleSignOut()}>logout</button> : null}
        </div>
      </div>
    </div>
  )
}

export default RightMenu