import React, { useContext } from 'react'
import styles from './profile.module.scss'
import { AppContext } from '../../providers/app-provider'
import Link from 'next/link'

const Profile = () => {
  const { currentUser, authLoading } = useContext(AppContext)
  return (
    <div className={styles.profile}>
      {!authLoading && currentUser ?
        <React.Fragment>
          <div> welcome back {currentUser.firstname} {currentUser.lastname}</div>
          {!currentUser.writer && currentUser.canBecomeWriter ?
            <Link href='become-a-writer'>
              <button>become a writer</button>
            </Link>
            : null}

        </React.Fragment>
        : <div>loading</div>
      }

    </div>
  )
}

export default Profile