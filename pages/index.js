import React, { useState, useContext } from 'react'
import { firebase } from '../firebase'
import styles from './index.module.scss'
import { AppContext } from '../providers/app-provider'
import SignUp from '../components/authentication/sign-up'
import PostCard from '../components/post-card'
import Footer from '../components/footer'

const Home = ({ posts }) => {
  const { isAuthed, authLoading } = useContext(AppContext)

  return (
    <div className={styles.index}>
      <div className={styles.hero}>
        <h1 className={styles.title}>a penny for your thoughts</h1>
        <p className={styles.description}>what do your favorite writers have to say today?</p>
      </div>

      <div className={`${styles.row} ${styles.alt}`}>
        <div className={`${styles.info_box} ${styles.statement} content`}>
          <div className={styles.left}>
            <h2 className="dark">find opinions from people you care about</h2>
            <hr />
            <p>get to know your writers via their profiles and establish a base of perspective</p>
            <p>writers by invite only -- but anyone can comment</p>
          </div>
          <div>
            <img className={styles.half_image} src="https://firebasestorage.googleapis.com/v0/b/pennythoughts-a9254.appspot.com/o/pennyboards-white.png?alt=media&token=4c0f4b4c-90d6-4fa4-9973-e7ed750f02e8" alt="penny boards" />
          </div>
        </div>
      </div>

      <div className={`${styles.row}`}>
        <div className={`${styles.info_box} ${styles.statement} content`}>
          <div className={styles.left}>
            <img className={styles.half_image} src="https://firebasestorage.googleapis.com/v0/b/pennythoughts-a9254.appspot.com/o/convo.png?alt=media&token=425606cc-d4b3-49a4-8c42-e140dcca8b54" alt="convo" />

          </div>
          <div className={styles.right}>
            <h2 className="dark">take a break from the bleak news</h2>
            <hr />
            <p>these arent scientific journals it’s okay if you’re not an expert, passion is what matters</p>
            <p>quick reads -- you’re not gonna spend all day here and we dont expect you to</p>

          </div>
        </div>
      </div>
      <div className={`${styles.row} ${styles.engage}`}>
        <div className={`${styles.info_box} ${styles.statement} content`}>
          <SignUp />
        </div>
      </div>
      <div className={`${styles.row}`}>
        <div className={`${styles.posts_grid}`}>
          <h1>hmm... a lot to think about</h1>
          <div className={styles.post_card_wrapper}>
            {posts.map((post, index) => {
              return <PostCard key={index} post={post} />
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export async function getStaticProps() {

  let posts = []
  await firebase.firestore()
    .collection('posts')
    .get()
    .then(docSnapshot => {
      docSnapshot.forEach(post => {
        for (let index = 0; index < 5; index++) {
          posts.push(post.data())
        }
      })
    })
    .catch(e => console.log(e))

  return {
    props: {
      posts
    }
  }
}

export default Home