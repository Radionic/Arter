import React from 'react'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px 20px 10px 20px'
    },
    text: {
        fontWeight: 'normal'
    },
    switch: {
        marginLeft: 'auto'
    }
})

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