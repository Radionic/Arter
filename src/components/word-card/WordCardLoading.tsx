import React from 'react'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import CardContent from '@material-ui/core/CardContent'
import VolumeUpIcon from '@material-ui/icons/VolumeUp'
import Typography from '@material-ui/core/Typography'
import Skeleton from '@material-ui/lab/Skeleton'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    wordCardLoading: {
        pointerEvents: 'auto',
        display: 'inline-block',
        margin: '0em 0.8rem 0em 0em',
        width: '100%',
        transition: 'opacity 0.5s',
        opacity: 1
    },
    loadingHeader: {
        padding: '16px 16px 0px 16px'
    },
    content: {
        padding: '0px 16px 8px 16px !important'
    },
    voiceBtn: {
        width: '0.8rem !important',
        height: '0.8rem !important',
        display: 'inline-block',
        verticalAlign: 'middle'
    },
    voiceBtnText: {
        fontSize: '0.8rem',
        display: 'inline-block',
        verticalAlign: 'middle'
    }
})

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