import React from 'react'
import { AppBar, Toolbar, IconButton } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Divider from '@material-ui/core/Divider'

import { useRecoilState } from 'recoil'
import { pageState } from '../states/app-state'
import { paddingState, spellcheckState } from '../states/preference-state'

import SwitchOption from '../components/settings/SwitchOption'
import SliderOption from '../components/settings/SliderOption'

import Page from './page'

const Settings: React.FC = props => {
    const [page, setPage] = useRecoilState(pageState)
    const [padding, setPadding] = useRecoilState(paddingState)
    const [spellcheck, setSpellcheck] = useRecoilState(spellcheckState)

    return (
        <>
            <AppBar position='sticky'>
                <Toolbar>
                    <IconButton onClick={() => setPage(Page.MainActivity)} color='inherit'>
                        <ArrowBackIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <SwitchOption text='Spell Check' checked={spellcheck} onChange={setSpellcheck} />

            <Divider />

            <SliderOption min={0} max={48} text='Left and Right Padding'
                value={padding.leftRight}
                onChange={(v: number) => setPadding({
                    ...padding,
                    leftRight: v
                })} />

            <SliderOption min={0} max={48} text='Top and Bottom Padding'
                value={padding.topBottom}
                onChange={(v: number) => setPadding({
                    ...padding,
                    topBottom: v
                })} />
        </>
    )
}

export default Settings

