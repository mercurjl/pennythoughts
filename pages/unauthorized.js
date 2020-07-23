import React from 'react'
import Link from 'next/link' 

const Unauthorized = () => { 
    return (
      <div>
        <h1>Unauthorized</h1>           
        <p>You need to be logged in to see this page.</p>
        <Link href="/">
          <a className="card">
            <p>Home</p>
          </a>
        </Link>
      </div>
    ) 
} 
export default Unauthorized