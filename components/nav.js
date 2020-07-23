import React from 'react'
import Link from 'next/link'
import styles from './nav.module.scss'
import RightMenu from './right-menu/right-menu'

const links = [
  { href: '/', label: 'home' },
  { href: '/posts', label: 'posts' },
  { href: '/writers', label: 'writers' },
]

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo_wrapper}>
        <Link href='/'>
          <img src="https://firebasestorage.googleapis.com/v0/b/pennythoughts-a9254.appspot.com/o/logo.png?alt=media&token=3f1681e5-cb3f-4188-b7b9-7e1518c870e4" alt="bike"/>
        </Link>
      </div>
      <div className={styles.links}>
        <ul>
          {links.map((link, index) => (
            <li key={index}>
              <Link href={link.href}>
                <a>{link.label}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.sign_in}>
        <RightMenu />
      </div>
    </nav>
  )
}

export default Nav
