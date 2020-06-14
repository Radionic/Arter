import React, { useRef } from 'react'
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import MenuIcon from '@material-ui/icons/Menu'
import VisibilityIcon from '@material-ui/icons/Visibility'
import SaveAltIcon from '@material-ui/icons/SaveAlt'

import WordCardsContainer from '../components/word-card/WordCardsContainer'
import MyDrawer from '../components/MyDrawer'
import MyEditor, { MyEditorRef } from '../components/MyEditor'

import { useRecoilState } from 'recoil'
import { editModeState, drawerVisibleState } from '../states/app-state'
import { cardVisibleState } from '../states/word-card-state'
import { autosaveState } from '../states/preference-state'

const MainActivity: React.FC = props => {
  // app state
  const [editMode, setEditMode] = useRecoilState(editModeState)
  const [, setDrawerVisible] = useRecoilState(drawerVisibleState)

  // preference state
  const [autosave,] = useRecoilState(autosaveState)

  // word card state
  const [cardVisible, setCardVisible] = useRecoilState(cardVisibleState)

  const myEditor = useRef<MyEditorRef>()

  const saveContent = () => {
    if (myEditor.current) myEditor.current.saveContent()
  }

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
          {!autosave && <SaveAltIcon onClick={saveContent} />}
          {editMode ? <VisibilityIcon onClick={toggleEditMode}> </VisibilityIcon> : <EditIcon onClick={toggleEditMode} />}
        </Toolbar>
      </AppBar>

      <MyDrawer />

      <MyEditor ref={myEditor} />

      <WordCardsContainer />
    </>
  )
}

export default MainActivity
