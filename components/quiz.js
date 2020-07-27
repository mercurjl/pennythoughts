import React, { useState, useEffect, Fragment } from 'react'
import Link from 'next/link'
import { firebase } from '../firebase'
import styles from './quiz.module.scss'
import RightMenu from './right-menu/right-menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const Quiz = ({ data }) => {
  const [answeredQuestions, setAnsweredQuestions] = useState([])
  const [selectedQuestion, setSelectedQuestion] = useState('none')
  const [questionData, setQuestionData] = useState('')

  const getQuestionBody = () => {
    if (selectedQuestion !== 'none') {
      let question = data.find(question => question.id === selectedQuestion)
      switch (question.answerType) {
        case 'short_answer':
          return <ShortAnswer question={question} questionData={questionData} setQuestionData={setQuestionData}/>
        default:
          break;
      }
    }
  }

  const handleAddAnswer = () => {
    console.log('click')
  }

  return (
    <div className={styles.quiz}>
      <h2>answer some questions so readers can get to know you:</h2>
      <select onChange={e => setSelectedQuestion(e.target.value)}>
        <option value='none'>Select One</option>
        {data.map((question, index) => {
          return (
            <option value={question.id} key={index}>{question.title}</option>
          )
        })}
      </select>
      {selectedQuestion !== 'none' ?
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