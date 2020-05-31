import React, { useEffect } from 'react'

import Page from './pages/page'
import MainActivity from './pages/MainActivity'
import Settings from './pages/Settings'

import { useRecoilState } from 'recoil'

import { pageState, drawerVisibleState } from './states/app-state'
import { BackgroundMode } from '@ionic-native/background-mode'

import './App.css'

// TODO: Custom font family

const App: React.FC = props => {
  const [page, setPage] = useRecoilState(pageState)
  const [drawerVisible, setDrawerVisible] = useRecoilState(drawerVisibleState)

  useEffect(() => {
    const backButtonListener = () => {
      if (drawerVisible) {
        setDrawerVisible(false)
        return
      }

      switch (page) {
        case Page.MainActivity:
          BackgroundMode.moveToBackground()
          break
        case Page.Settings:
          setPage(Page.MainActivity)
          break
      }
    }

    document.addEventListener('backbutton', backButtonListener)
    return () => document.removeEventListener('backbutton', backButtonListener)
  }, [drawerVisible, page])
  
  const renderPage = () => {
    switch (page) {
      case Page.MainActivity:
        return <MainActivity />
      case Page.Settings:
        return <Settings />
      default:
        return null
    }
  }

  return renderPage()
}

export default App
