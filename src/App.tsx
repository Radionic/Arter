import React from 'react'
import Page from './pages/page'
import MainActivity from './pages/MainActivity'
import Settings from './pages/Settings'

import { createStore } from 'redux'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import { Provider, connect } from 'react-redux'
import rootReducer, { AppState } from './redux/reducers'
import { setPage } from './redux/actions'

import './App.css'

// TODO: Custom font family

const store = createStore(rootReducer)

const App: React.FC<ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>> = (props) => {
  const { page } = props

  const renderPage = () => {
    switch (page) {
      case Page.MainActivity:
        return <MainActivity />
      case Page.Settings:
        return <Settings />
    }
  }

  return renderPage()
}

const mapStateToProps = (state: AppState) => {
  return {
    page: state.viewState.page
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators({
  setPage
}, dispatch)

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

const AppStoreProvider: React.FC = () => {
  return (
    <Provider store={store}>
      <ConnectedApp />
    </Provider>
  )
}

export default AppStoreProvider
