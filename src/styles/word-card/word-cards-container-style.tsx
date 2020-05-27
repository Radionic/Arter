import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
    cardsContainer: {
        padding: '0.4rem',
        whiteSpace: 'nowrap',
        transform: 'translateY(20px)',
        transition: 'transform 0.5s'
    },
    animationWrapper: {
        pointerEvents: 'none',
        position: 'fixed',
        width: '100%',
        bottom: '0px',
        opacity: 0,
        transform: 'translateY(20px)',
        transition: '0.75s',
        '&.visible': {
            opacity: 1,
            transform: 'translateY(0px)'
        }
    }
})

export default useStyles
