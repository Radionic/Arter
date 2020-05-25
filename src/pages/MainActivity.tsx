import React from 'react'
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import MenuIcon from '@material-ui/icons/Menu'
import VisibilityIcon from '@material-ui/icons/Visibility'

import WordCardsContainer from '../components/word-card/WordCardsContainer'
import MyDrawer from '../components/MyDrawer'
import MyEditor from '../components/MyEditor'

import { useRecoilState } from 'recoil'
import { editModeState, drawerVisibleState } from '../states/app-state'
import { cardVisibleState } from '../states/word-card-state'

import './MainActivity.css'

const MainActivity: React.FC = props => {
  const [editMode, setEditMode] = useRecoilState(editModeState)
  const [cardVisible, setCardVisible] = useRecoilState(cardVisibleState)
  const [drawerVisible, setDrawerVisible] = useRecoilState(drawerVisibleState)

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

export default MainActivity
