import React, { useState, useEffect } from 'react'
import { auth, firebase } from '../firebase';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isAuthed, setIsAuthed] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    setAuthLoading(true)
    auth.onAuthStateChanged(authUser => {
      if (!authUser) {
        setIsAuthed(false)
        setAuthLoading(false)
      } else {
        setAuthLoading(false)
        setIsAuthed(true)

      }
    })
  }, [auth.currentUser])

  useEffect(() => {
    if (isAuthed) {
      firebase.firestore()
        .collection('users')
        .doc('5XbCZSdqLVf4x15KbudlYAvDwSp1')
        .onSnapshot(userSnapshot => {
          firebase.firestore().collection('users')
            .doc(auth.currentUser.uid)
            .collection('quizAnswers')
            .onSnapshot(qa => {
              let quizAnswers = []
              qa.forEach(answers => quizAnswers.push(answers.data()))
              setCurrentUser({ ...userSnapshot.data(), quizAnswers: quizAnswers })
            })
        })
    }
  }, [isAuthed])

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