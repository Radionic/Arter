import React from 'react'
import { AppBar, Toolbar, IconButton } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Divider from '@material-ui/core/Divider'

import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import { connect } from 'react-redux'
import { AppState } from '../redux/reducers'
import { setPage, setLeftRightPadding, setTopBottomPadding, setSpellcheck } from '../redux/actions'

import SwitchOption from '../components/settings/SwitchOption'
import SliderOption from '../components/settings/SliderOption'

import Page from './page'

const Settings: React.FC<ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>> = (props) => {
    const { leftRightPadding, topBottomPadding, spellcheck } = props
    const { setLeftRightPadding, setTopBottomPadding, setSpellcheck, setPage } = props

    return (
        <>
            <AppBar position='sticky'>
                <Toolbar>
                    <IconButton onClick={() => setPage(Page.MainActivity)} color='inherit'>
                        <ArrowBackIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <SwitchOption text='Spell Check' checked={spellcheck} onChange={(v: boolean) => setSpellcheck(v)} />
            <Divider />
            <SliderOption min={0} max={48} text='Left and Right Padding' value={leftRightPadding} onChange={(v: number) => setLeftRightPadding(v)} />
            <SliderOption min={0} max={48} text='Top and Bottom Padding' value={topBottomPadding} onChange={(v: number) => setTopBottomPadding(v)} />
        </>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        leftRightPadding: state.preferenceState.leftRightPadding,
        topBottomPadding: state.preferenceState.topBottomPadding,
        spellcheck: state.preferenceState.spellcheck
    }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators({
    setPage,
    setLeftRightPadding,
    setTopBottomPadding,
    setSpellcheck
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings)

