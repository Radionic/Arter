import React from 'react'
import Card from '@material-ui/core/Card'

import Word from '../../models/word'

import Typography from '@material-ui/core/Typography'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { makeStyles } from '@material-ui/core/styles'

type WordCardExampelsProps = {
    handleBack: () => void,
    word: Word,
    meaningExamples: string,
    POS: string,
}

const useStyles = makeStyles({
    wordCardExampels: {
        pointerEvents: 'auto',
        display: 'inline-block',
        margin: '0em 0.8rem 0em 0em',
        width: '100%',
        transition: 'opacity 0.5s',
        opacity: 1
    },
    backArrow: {
        padding: '16px 16px 0px 16px'
    },
    header: {
        padding: '0px 16px 0px 16px',
    },
    headerTitle: {
        fontSize: '1.25rem !important'
    },
    content: {
        padding: '0px 16px 8px 16px !important'
    },
    text: {
        whiteSpace: 'normal'
    }
})

const WordCardExampels: React.FC<WordCardExampelsProps> = (props) => {
    const { handleBack, word, meaningExamples, POS } = props

    const classes = useStyles()

    return (
        <Card className={classes.wordCardExampels}>
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

export default WordCardExampels