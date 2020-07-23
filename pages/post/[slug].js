import React from 'react'
import { useRouter } from 'next/router';
import { firebase } from '../../firebase'

const Post = (post) => {
  return (
    <div>
      <div>Title: {post.title}</div>
      <div>Author: {post.author}</div>
      <p>Body:</p>
      <p>{post.body}</p>
    </div>
  )
}

// This function gets called at build time
export async function getStaticPaths() {

  let posts = []
  await firebase.firestore()
    .collection('posts')
    .get()
    .then(docSnapshot => {
      docSnapshot.forEach(post => {
        posts.push(post.data())
      })
    })
    .catch(e => console.log(e))

  // Get the paths we want to pre-render based on posts
  const paths = posts.map(post => ({
    params: { slug: post.slug },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

// This also gets called at build time
export async function getStaticProps({ params }) {

  let post = {}
  await firebase.firestore()
    .collection('posts')
    .doc(params.slug)
    .get()
    .then(postSnapshot => post = postSnapshot.data())
    .catch(e => console.log(e))

  return { props: {...post} }
}



export default Post