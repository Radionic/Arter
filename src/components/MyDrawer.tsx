import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import SettingsIcon from '@material-ui/icons/Settings'
import { makeStyles } from '@material-ui/styles'

import { Dispatch, AnyAction, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { AppState } from '../redux/reducers'
import { setPage, setDrawerVisible } from '../redux/actions'

import Page from '../pages/page'

const useStyles = makeStyles({
    drawer: {
        width: '200px'
    }
})

type MyDrawerProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const MyDrawer: React.FC<MyDrawerProps> = (props) => {
    const { visible } = props
    const { setDrawerVisible, setPage } = props
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
        <Drawer anchor='left' open={visible} onClose={() => setDrawerVisible(false)}>
            {renderDrawerContent()}
        </Drawer >
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        visible: state.viewState.drawerVisible
    }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators({
    setPage,
    setDrawerVisible
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyDrawer)