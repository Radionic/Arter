import React from 'react'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import CardContent from '@material-ui/core/CardContent'
import VolumeUpIcon from '@material-ui/icons/VolumeUp'
import Typography from '@material-ui/core/Typography'
import Skeleton from '@material-ui/lab/Skeleton'

import useStyles from '../../styles/word-card/word-card-loading-style'

const WordCardLoading: React.FC = (props) => {
    const classes = useStyles()

    return (
        <Card className={clsx(classes.wordCardLoading)}>
            <div className={classes.loadingHeader}>
                <Skeleton animation='wave' style={{ width: Math.random() * 3 + 5 + 'rem' }} />
                <Skeleton animation='wave' style={{ width: Math.random() * 2 + 2 + 'rem' }} />
                <Grid container direction='row' alignItems='center'>
                    <div>
                        <VolumeUpIcon className={classes.voiceBtn} />
                        <Typography variant='body2' className={classes.voiceBtnText}>UK &nbsp;</Typography>
                    </div>
                    <div>
                        <VolumeUpIcon className={classes.voiceBtn} />
                        <Typography variant='body2' className={classes.voiceBtnText}>US</Typography>
                    </div>
                </Grid>
            </div>

            <CardContent className={classes.content}>
                <Skeleton animation='wave' style={{ width: Math.random() * 2 + 3 + 'rem' }} />
                <Skeleton animation='wave' style={{ width: Math.random() * 2 + 3 + 'rem' }} />
                <Skeleton animation='wave' style={{ width: Math.random() * 2 + 3 + 'rem' }} />
            </CardContent>
        </Card>
    )
}

export default WordCardLoading
