import React from 'react'
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import MenuIcon from '@material-ui/icons/Menu'
import VisibilityIcon from '@material-ui/icons/Visibility'

import WordCardsContainer from '../components/word-card/WordCardsContainer'
import MyDrawer from '../components/MyDrawer'
import MyEditor from '../components/MyEditor'

import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import { connect } from 'react-redux'
import { AppState } from '../redux/reducers'
import { setCardVisible, setEditMode, setDrawerVisible } from '../redux/actions'

import './MainActivity.css'

type MainActivityProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const MainActivity: React.FC<MainActivityProps> = props => {
  const { cardVisible, editMode } = props
  const { setCardVisible, setEditMode, setDrawerVisible } = props

  const toggleEditMode = () => {
    setEditMode(!editMode)
    if (cardVisible) setCardVisible(false)
  }

  return (
    <>
      <AppBar position='sticky'>
        <Toolbar>
          <IconButton onClick={() => setDrawerVisible(true)} edge='start' color='inherit'> <MenuIcon /> </IconButton>
          <Typography variant='h6' style={{ flexGrow: 1 }}>
            Arter
          </Typography>
          {editMode ? <VisibilityIcon onClick={toggleEditMode}> </VisibilityIcon> : <EditIcon onClick={toggleEditMode} />}
        </Toolbar>
      </AppBar>

      <MyDrawer />

      <MyEditor />

      <WordCardsContainer />
    </>
  )
}

const mapStateToProps = (state: AppState) => {
  return {
    cardVisible: state.wordCardState.cardVisible,
    editMode: state.viewState.editMode,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators({
  setCardVisible,
  setEditMode,
  setDrawerVisible
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainActivity)
