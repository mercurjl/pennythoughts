import App from 'next/app'
import React from 'react'
import TagManager from 'react-gtm-module'
import Nav from '../components/nav'
import Head from 'next/head'
import { AppProvider } from '../providers/app-provider'
import { ToastContainer } from 'react-nextjs-toast'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css' // Import the CSS

import '../styles/base.scss'

config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

const tagManagerArgs = {
  gtmId: 'GTM-KS86BB8'
}

const Context = React.createContext();

class MyApp extends App {

  componentDidMount() {
    TagManager.initialize(tagManagerArgs)
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <AppProvider>
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Inria+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap" rel="stylesheet" />
        </Head>
        <Nav />
        <div className="content_wrapper">
          <Component {...pageProps} />
        </div>
        <ToastContainer />
      </AppProvider>
    )
  }
}

export default MyApp