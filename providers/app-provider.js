import React, { useState, useEffect } from 'react'
import { auth, firebase } from '../firebase';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isAuthed, setIsAuthed] = useState(auth.currentUser != null)
  const [authLoading, setAuthLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    setAuthLoading(true)
    auth.onAuthStateChanged(authUser => {
      if (!authUser) {
        setIsAuthed(false)
        setAuthLoading(false)
      } else {
        setIsAuthed(true)
        firebase.firestore().collection('users')
          .doc(auth.currentUser.uid)
          .get()
          .then(res => {
            setCurrentUser(res.data())
            setAuthLoading(false)
          })
          .catch(e => console.log(e))
      }
    })
  }, [auth.currentUser])

  const context = {
    isAuthed,
    authLoading,
    currentUser
  }

  return (
    <AppContext.Provider value={context}>
      {children}
    </AppContext.Provider>
  );
}

export { AppProvider, AppContext }