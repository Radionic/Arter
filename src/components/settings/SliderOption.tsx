import React, { ChangeEvent } from 'react'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'

import useStyles from '../../styles/settings/slider-option-style'

type SliderOptionProps = {
    value: number,
    title: string,
    valueText: string,
    onChange: (event: ChangeEvent<{}>, value: number | number[]) => void,
    [key: string]: any
}

const SliderOption: React.FC<SliderOptionProps> = ({ value, title, valueText, onChange, ...rest }) => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <div className={classes.textContainer}>
                <Typography variant='subtitle1' className={classes.text}> {title} </Typography>
                <Typography variant='subtitle2' className={classes.text2}> {valueText} </Typography>
            </div>
            <Slider {...rest} value={value} onChange={onChange} color='primary' className={classes.slider} />
        </div>
    )
}

export default React.memo(SliderOption)
