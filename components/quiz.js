import React, { useState, useEffect, useContext, Fragment } from 'react'
import Link from 'next/link'
import { firebase } from '../firebase'
import styles from './quiz.module.scss'
import RightMenu from './right-menu/right-menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-nextjs-toast'
import { AppContext } from '../providers/app-provider'
import _ from 'lodash'

const Quiz = ({ data }) => {
  const [unansweredQuestions, setUnansweredQuestions] = useState([])
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [questionData, setQuestionData] = useState('')
  const { currentUser } = useContext(AppContext)

  useEffect(() => {
    console.log("set unanswered")
    setUnansweredQuestions(_.differenceBy(data, currentUser.quizAnswers, 'id'))

  }, [data, currentUser])

  const getQuestionBody = () => {
    if (selectedQuestion) {
      switch (selectedQuestion.answerType) {
        case 'short_answer':
          return <ShortAnswer question={selectedQuestion} questionData={questionData} setQuestionData={setQuestionData} />
        default:
          break;
      }
    }
  }

  const handleAddAnswer = () => {
    setSelectedQuestion(null)
    setQuestionData('')
    firebase.firestore().collection('users')
      .doc(firebase.auth().currentUser.uid)
      .collection('quizAnswers')
      .add({ ...selectedQuestion, answer: questionData })
      .then(res => {
        toast.notify(`Answer Added!`, { type: "success" })
      })
      .catch(e => {
        toast.notify(`Whoops, something wrong happened`, { type: "error" })
      })
  }

  return (
    <div className={styles.quiz}>
      <h2>answer some questions so readers can get to know you:</h2>
      <select
        onChange={e => e.target.value !== null ? setSelectedQuestion(unansweredQuestions.find(question => question.id === (e.target.value))) : setSelectedQuestion(null)}
        value={selectedQuestion}
      >
        <option
          value={null}
        >
          Select One
        </option>
        {unansweredQuestions.map((question, index) => {
          return (
            <option value={question.id} key={index}>{question.title}</option>
          )
        })}
      </select>
      {selectedQuestion ?
        <div className={styles.question_wrapper}>
          {getQuestionBody()}
          <button
            className='primary'
            onClick={() => handleAddAnswer()}
          >
            add to your profile
          </button>
        </div> : null
      }


    </div>
  )
}

export default Quiz

const ShortAnswer = ({ question, questionData, setQuestionData }) => {
  return (
    <Fragment>
      <h2>{question.title}</h2>
      <textarea
        cols="30"
        rows="10"
        value={questionData}
        onChange={e => setQuestionData(e.target.value)}
      />
    </Fragment>
  )
}