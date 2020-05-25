import React from 'react'
import Page from './pages/page'
import MainActivity from './pages/MainActivity'
import Settings from './pages/Settings'

import { useRecoilState } from 'recoil'

import { pageState } from './states/app-state'

import './App.css'

// TODO: Custom font family

const App: React.FC = props => {
  const [page, setPage] = useRecoilState(pageState)

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
