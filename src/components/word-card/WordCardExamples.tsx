import React from 'react'
import Card from '@material-ui/core/Card'

import Word from '../../models/word'

import Typography from '@material-ui/core/Typography'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import useStyles from '../../styles/word-card/word-card-examples-style'

type WordCardExamplesProps = {
    handleBack: () => void,
    word: Word,
    meaningExamples: string,
    POS: string,
}

const WordCardExamples: React.FC<WordCardExamplesProps> = (props) => {
    const { handleBack, word, meaningExamples, POS } = props

    const classes = useStyles()

    return (
        <Card className={classes.wordCardExamples}>
            <ArrowBackIcon className={classes.backArrow} onClick={handleBack} />
            <CardHeader titleTypographyProps={{variant: 'h6'}} className={classes.header} title={word.word + ' (' + meaningExamples + ')'} subheader={POS} />
            <CardContent className={classes.content}>
                {
                    word.translatedExamples.get(meaningExamples)!.map((exSen, i) => {
                        const els = []
                        els.push(<Typography variant='body2' className={classes.text}>{(i + 1) + '. ' + word.englishExamples.get(meaningExamples)![i]}</Typography>)
                        els.push(<Typography variant='body2' className={classes.text}>&nbsp;&nbsp;&nbsp; {exSen}</Typography>)

                        return els
                    })
                }
            </CardContent>
        </Card>
    )
}

export default WordCardExamples
