import React from 'react'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import VolumeUpIcon from '@material-ui/icons/VolumeUp'
import Typography from '@material-ui/core/Typography'

import { useRecoilState } from 'recoil'
import { wordState, examplesState } from '../../states/word-card-state'

import useStyles from '../../styles/word-card/word-card-style'

import WordCardExamples from './WordCardExamples'

export type CardProps = {
    visible: boolean,
    POS: string
}

const WordCard: React.FC<CardProps> = props => {
    const classes = useStyles()

    const { visible, POS } = props
    const [word, ] = useRecoilState(wordState)
    const [examples, setExamples] = useRecoilState(examplesState)

    if (!word || !POS) return null

    if (examples && word.translatedExamples.get(examples)) return (<WordCardExamples word={word} meaningExamples={examples} POS={POS} handleBack={() => setExamples(null)} />)

    const playVoice = (isUK: boolean) => {
        const link = word.pronunciation.get(POS)![isUK ? 0 : 1]
        new Audio(link).play()
    }

    const renderCardHeader = () => {
        const orgWord = word!.orgWord.get(POS)
        if (orgWord === word.word) return <CardHeader className={classes.header} title={orgWord} subheader={POS} />
        return <CardHeader className={classes.header} title={orgWord + ' (' + word.word + ')'} subheader={POS} />
    }

    return (
        <Card className={clsx(classes.wordCard, { [classes.wordCardVisible]: visible })}>
            {renderCardHeader()}
            <CardContent className={classes.content}>
                <Grid className={classes.voiceBtnsGrid} container direction='row' alignItems='center'>
                    <div onClick={() => playVoice(true)}>
                        <VolumeUpIcon className={classes.voiceBtn} />
                        <Typography variant='body2' className={classes.voiceBtnText}>UK &nbsp;</Typography>
                    </div>
                    <div onClick={() => playVoice(false)}>
                        <VolumeUpIcon className={classes.voiceBtn} />
                        <Typography variant='body2' className={classes.voiceBtnText}>US</Typography>
                    </div>
                </Grid>
                {word!.meanings.get(POS)!.map((meaning: string, i: number) => {
                    return <Typography variant='body2' onClick={() => setExamples(meaning)}>{i + 1 + '. ' + meaning}</Typography>
                })}
            </CardContent>
        </Card>
    )
}

export default WordCard
