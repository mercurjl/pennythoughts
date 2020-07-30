import React, { useContext, Fragment } from 'react'
import { firebase } from '../firebase'
import { AppContext } from '../providers/app-provider'
import styles from './become-a-writer.module.scss'
import Quiz from '../components/quiz'


const Dashboard = ({ quizData }) => {
  const { currentUser, authLoading, isAuthed } = useContext(AppContext)
  return (
    <div className={`${styles.become_a_writer}`}>
      {!authLoading && currentUser ? <div>
        {currentUser.canBecomeWriter ?
          <Fragment>
            <div className={`${styles.header}`}>
              <h1>become a writer</h1>
              <p>Before you can be a writer we need to know a little bit about you. We have a little quiz for you to take so readers can gauge a general feel for your interest outside of what is in your profile.</p>
            </div>

            <Quiz data={quizData} />
          </Fragment>
          :
          <div>
            <p>you're not green lit for this just yet, if you there are any issues email <strong>support@pennythoughts.io</strong></p>
          </div>
        }
      </div> :
      <div>
        loading
      </div>
      }
    </div>
  )
}

export async function getStaticProps() {
  let quizData = []

  await firebase.firestore()
    .collection('quiz')
    .doc('writer-quiz')
    .collection('questions')
    .get()
    .then(quizQuestionSnapshot => {
      quizData = quizQuestionSnapshot.docs.map(question => {
        return { ...question.data(), id: question.id }
      })
    })
    .catch(e => console.log(e))

  return {
    props: {
      quizData
    }
  }
}

export default Dashboard