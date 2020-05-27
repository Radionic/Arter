import React from 'react'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'

import useStyles from '../../styles/settings/slider-option-style'

const SliderOption: React.FC<{ text: string, value: number, onChange: Function, [key: string]: any }> = ({ text, value, onChange, ...rest }) => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <div className={classes.textContainer}>
                <Typography variant='subtitle1' className={classes.text}> {text} </Typography>
                <Typography variant='subtitle2' className={classes.text2}> {value}px </Typography>
            </div>
            <Slider {...rest} value={value} onChange={(e, v) => onChange(v)} color='primary' className={classes.slider} />
        </div>
    )
}

export default SliderOption
