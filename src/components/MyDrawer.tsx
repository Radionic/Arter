import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import SettingsIcon from '@material-ui/icons/Settings'

import { useRecoilState } from 'recoil'
import { drawerVisibleState, pageState } from '../states/app-state'

import useStyles from '../styles/my-drawer-style'

import Page from '../pages/page'

const MyDrawer: React.FC = props => {
    const [drawerVisible, setDrawerVisible] = useRecoilState(drawerVisibleState)
    const [, setPage] = useRecoilState(pageState)
    const classes = useStyles()

    const renderDrawerContent = () => (
        <div className={classes.drawer}>
            <List>
                <ListItem button onClick={() => {
                    setDrawerVisible(false)
                    setPage(Page.Settings)
                }}>
                    <ListItemIcon><SettingsIcon /></ListItemIcon>
                    <ListItemText primary='Preferences' />
                </ListItem>
            </List>
            <Divider />
        </div>
    )

    return (
        <Drawer anchor='left' open={drawerVisible} onClose={() => setDrawerVisible(false)}>
            {renderDrawerContent()}
        </Drawer >
    )
}

export default React.memo(MyDrawer)
