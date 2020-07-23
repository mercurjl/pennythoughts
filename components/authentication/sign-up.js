import React, { useState, useEffect } from 'react'
import styles from './sign-up.module.scss'
import { useForm } from 'react-hook-form'
import { firebase } from 'firebase'
import { toast } from 'react-nextjs-toast'
import ThirdPartySignIn from './third-party-sign-in'

const emailRegexTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const SignUp = () => {
  const { register, handleSubmit, watch, errors } = useForm()
  const [warning, setWarning] = useState('')

  const onSubmit = data => {
    firebase.auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(res => {
        console.log(res)
        firebase.firestore().collection('users')
          .doc(res.user.uid)
          .set({
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            author: false,
            uid: res.user.uid
          })
          .then(res => {
            toast.notify(`Account created!`, {type: "success"})
          })
      })
      .catch(err => {
        const { code, message } = err
        return setWarning(message)
      })
  }

  return (
    <div className={`${styles.sign_up} input_wrapper info_box`}>
      <h1>sign up and contribute!</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="first name" name="firstname" ref={register({ required: true,
          validate: value => value.length >= 2
        })} />
        <input placeholder="last name or initial" name="lastname" ref={register({ required: true })} />
        <input placeholder="email" name="email" type="email" ref={register({ required: true })} />
        <input placeholder="password" name="password" type="password" ref={register({ required: true })} />
        <input placeholder="repeat password" name="passwordCheck" type="password" ref={register({
          required: true,
          validate: value => {
            return value === watch('password')
          }
        })} />
        <div className="note">* all fields are required</div>
        {errors.firstname && <div className="warning">First names need to be at least two (2) characters</div>}
        {errors.passwordCheck && <div className="warning">passwords don't match</div>}
        {warning !== '' ? <div className="warning">{warning}</div> : null}
        <button className="button" type="submit">sign up</button>
        <ThirdPartySignIn style="dark" text="sign up other ways"/>
      </form>
    </div>
  )
}

export default SignUp