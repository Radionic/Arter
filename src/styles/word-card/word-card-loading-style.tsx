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

export default useStyles
