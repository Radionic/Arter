import React, { ChangeEvent } from 'react'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'

import useStyles from '../../styles/settings/switch-option-style'

type SwitchOptionProps = {
    text: string,
    checked: boolean,
    onChange: (event: ChangeEvent, checked: boolean) => void,
    [key: string]: any
}

const SwitchOption: React.FC<SwitchOptionProps> = ({ text, checked, onChange, ...rest }) => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Typography variant='subtitle1' className={classes.text}> {text} </Typography>
            <Switch {...rest} className={classes.switch} onChange={onChange} color='primary' checked={checked} />
        </div>
    )
}

export default React.memo(SwitchOption)
