import React from 'react'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'

import useStyles from '../../styles/settings/switch-option-style'

const SwitchOption: React.FC<{ text: string, checked: boolean, onChange: Function }> = ({ text, checked, onChange }) => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Typography variant='subtitle1' className={classes.text}> {text} </Typography>
            <Switch className={classes.switch} onChange={(e, v) => onChange(v)} color='primary' checked={checked} />
        </div>
    )
}

export default SwitchOption