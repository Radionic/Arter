import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    wordCardExamples: {
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

export default useStyles
