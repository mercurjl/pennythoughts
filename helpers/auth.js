import { auth, firebase } from '../firebase'
import { toast } from 'react-nextjs-toast'

export const handleSignGoogleIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(res => {
      firebase.firestore().collection('users')
        .doc(res.user.uid)
        .get()
        .then(user => {
          if (!user.exists) {
            let displayName = res.user.displayName.split(' ');
            let firstname = displayName[0];
            let lastname = '';

            if (displayName.length >= 2) {
              for (let i = 1; i < displayName.length; i++) {

                if (i >= 2) {
                  lastname = lastname + ' ' + displayName[i];
                } else {
                  lastname = displayName[i];
                }
              }
            }

            firebase.firestore().collection('users')
              .doc(res.user.uid)
              .set({
                firstname: firstname,
                lastname: lastname,
                email: res.user.email,
                author: false,
                uid: res.user.uid
              })
              .then(res => {
                toast.notify(`Account created!`, { type: "success" })
              })
              .catch(e => console.log(e))
          }
        })
        .catch(e => console.log(e))
    })
    .catch(error => {
      if (error.code !== "auth/popup-closed-by-user") {
        alert('signin err');
        console.log(error);
      }
    });
}

export const handleCreateEmailSignIn = (emailSignIn) => {
  return firebase.auth()
    .createUserWithEmailAndPassword(emailSignIn.email, emailSignIn.password)
    .then(res => {
      console.log(res)
      firebase.firestore().collection('users')
        .doc(res.user.uid)
        .set({
          firstName: emailSignIn.firstname,
          lastName: emailSignIn.lastname,
          email: emailSignIn.email,
          uid: res.user.uid
        })
    })
    .catch(err => {
      const { code, message } = err
      return message
    })
}

export const handleEmailSignIn = (emailSignIn) => {
  firebase.auth()
    .signInWithEmailAndPassword(emailSignIn.email, emailSignIn.password)
    .catch(err => {
      const { code, message } = err
      console.log(message)
    })
}

export const handleSignOut = () => {
  auth.signOut()
    .then(() => {
      toast.notify(`Logout successful`, { type: "success" })
    })
    .catch(function (error) {
      alert('signout err');
      console.log(error);
    });
}