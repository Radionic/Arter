import React, { useCallback, ChangeEvent } from 'react'
import { AppBar, Toolbar, IconButton } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Divider from '@material-ui/core/Divider'

import { useRecoilState } from 'recoil'
import { pageState } from '../states/app-state'
import { paddingState, spellcheckState, autosaveState } from '../states/preference-state'

import SwitchOption from '../components/settings/SwitchOption'
import SliderOption from '../components/settings/SliderOption'

import Page from './page'

const Settings: React.FC = props => {
    const [, setPage] = useRecoilState(pageState)
    const [padding, setPadding] = useRecoilState(paddingState)
    const [spellcheck, setSpellcheck] = useRecoilState(spellcheckState)
    const [autosave, setAutosave] = useRecoilState(autosaveState)

    const handleSpellcheckChange = useCallback((e: ChangeEvent, checked: boolean) => setSpellcheck(checked), []) // it seems unnecessary to re-memorize the function when spellcheck state changes.

    const handleLeftRightPaddingChange = useCallback((e: ChangeEvent<{}>, v: number | number[]) => setPadding({
        ...padding,
        leftRight: v
    }), [padding.leftRight])

    const handleTopBottomPaddingChange = useCallback((e: ChangeEvent<{}>, v: number | number[]) => setPadding({
        ...padding,
        topBottom: v
    }), [padding.topBottom])

    const handleAutosaveChange = useCallback((e: ChangeEvent, checked: boolean) => setAutosave(checked), [])

    return (
        <>
            <AppBar position='sticky'>
                <Toolbar>
                    <IconButton onClick={() => setPage(Page.MainActivity)} color='inherit'>
                        <ArrowBackIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <SwitchOption text='Autosave' checked={autosave} onChange={handleAutosaveChange} />
            
            <SwitchOption text='Spell Check' checked={spellcheck} onChange={handleSpellcheckChange} />

            <Divider />

            <SliderOption min={0} max={48} title='Left and Right Padding'
                value={padding.leftRight}
                valueText={padding.leftRight + 'px'}
                onChange={handleLeftRightPaddingChange} />

            <SliderOption min={0} max={48} title='Top and Bottom Padding'
                value={padding.topBottom}
                valueText={padding.topBottom + 'px'}
                onChange={handleTopBottomPaddingChange} />
        </>
    )
}

export default Settings
