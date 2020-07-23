import React from 'react'
import styles from './footer.module.scss'
import Link from 'next/link'

const links = [
  { href: '/', label: 'home' },
  { href: '/post', label: 'posts' },
  { href: '/writer', label: 'writers' },
]

const Footer = () => {
  return (
    <nav className={styles.footer}>
      <div>
        <Link href='/'>
          <img src="https://firebasestorage.googleapis.com/v0/b/pennythoughts-a9254.appspot.com/o/logo.png?alt=media&token=3f1681e5-cb3f-4188-b7b9-7e1518c870e4" alt="bike" />
        </Link>
      </div>
      <div>
        <ul>
          {links.map((link, index) => (
            <li key={index} >
              <Link href={link.href}>
                <a>{link.label}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.copyright}>
        &#169; pennythoughts.io | 2020
      </div>
    </nav>
  )
}

export default Footer
