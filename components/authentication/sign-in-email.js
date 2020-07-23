import React, { useState } from 'react'
import { handleEmailSignIn } from '../../helpers/auth'
import styles from './sign-in-email.module.scss'

const SignInEmail = () => {
  const [emailSignIn, setEmailSignIn] = useState({})

  return (
    <div className={styles.sign_in_email}>
      <label>Sign in using email:</label>
      <input name="email" type="text"
        onChange={e => setEmailSignIn({ ...emailSignIn, [e.target.name]: e.target.value })}
        placeholder="Email"
      />
      <input name="password" type="password"
        onChange={e => setEmailSignIn({ ...emailSignIn, [e.target.name]: e.target.value })}
        placeholder="Password"
      />
      <button type="submit" value="Sign In" className="button primary" onClick={() => handleEmailSignIn(emailSignIn)}>sign in</button>
    </div>
    
  )
}

export default SignInEmail