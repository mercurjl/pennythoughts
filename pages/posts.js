import React from 'react'
import { firebase } from '../firebase'
import Link from 'next/link';
import styles from './posts.module.scss'
import styled from 'styled-components';

const Posts = ({ posts }) => {

  return (
    <div className={`${styles.posts} content`}>
      <h1>Posts</h1>
      <div className={styles.posts_wrapper}>
        {posts.map((post, index) => {
          return <Post key={index} index={index} post={post} tall={index === 1 || index === 6} />
        })}
      </div>
    </div>
  )
}


const Post = ({ post, tall, index }) => {
  return (
    <Link href="/post/[slug]" as={`/post/${post.slug}`}>
      <StyledPost index={index}>
        {/* <img className={styles.post_card_img} src="https://cdn.pixabay.com/photo/2020/04/14/11/16/fox-5042210_960_720.jpg" alt=" fox" /> */}
        <div className={styles.meta_data}>
          <div className={styles.title}>{post.title}</div>
          <div className={styles.author}>by {post.author}</div>
          <div>{post.exerpt}</div>
        </div>

      </StyledPost>
    </Link>
  )
}

const StyledPost = styled.div`
  animation-delay: ${props => {
    return (200 * props.index)
  }}ms !important;
`;

export async function getStaticProps() {
  console.log('getStaticProps')
  let posts = []
  await firebase.firestore()
    .collection('posts')
    .get()
    .then(docSnapshot => {
      docSnapshot.forEach(post => {
        for (let index = 0; index < 30; index++) {
          posts.push(post.data())
        }
      })
    })

  return {
    props: {
      posts
    }
  }
}

export default Posts