import React from 'react'
import Link from 'next/link';
import styles from './post-card.module.scss'

const PostCard = ({ post }) => {
  return (
    <Link href="/post/[slug]" as={`/post/${post.slug}`}>
      <div className={styles.post_card}>
        <img className={styles.post_card_img} src="https://cdn.pixabay.com/photo/2020/04/14/11/16/fox-5042210_960_720.jpg" alt=" fox"/>
        <div className={styles.title}>{post.title}</div>
        <div className={styles.author}>by {post.author}</div>
        <div>{post.exerpt}</div>
        
      </div>
    </Link>
  )
}

export default PostCard