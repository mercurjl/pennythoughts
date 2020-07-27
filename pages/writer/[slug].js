import React from 'react'
import { useRouter } from 'next/router';
import { firebase } from '../../firebase'

const Writer = (writer) => {
  return (
    <div>
    </div>
  )
}

// This function gets called at build time
export async function getStaticPaths() {

  let writers = []
  await firebase.firestore()
    .collection('writers')
    .get()
    .then(docSnapshot => {
      docSnapshot.forEach(writer => {
        writers.push(writer.data())
      })
    })

  // Get the paths we want to pre-render based on writers
  const paths = writers.map(writer => ({
    params: { slug: writer.slug },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

// This also gets called at build time
export async function getStaticProps({ params }) {

  let writer = {}
  await firebase.firestore()
    .collection('writers')
    .doc(params.slug)
    .get()
    .then(writerSnapshot => writer = writerSnapshot.data())
    .catch(e => console.log(e))

  return { props: {...writer} }
}



export default Writer