import React, { useState } from 'react'
import { Swipeable, EventData } from 'react-swipeable'

import WordCard from './WordCard'
import WordCardLoading from './WordCardLoading'

import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import { connect } from 'react-redux'
import { AppState } from '../../redux/reducers'
import { setCardVisible } from '../../redux/actions'

import './WordCardsContainer.css'

const WordCardsContainer: React.FC<ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>> = (props) => {
    const [transformX, setTransformX] = useState<number>(0)

    const { setCardVisible } = props
    const { word, cardVisible, meaningExamples } = props

    const handleSwipeLeft = (e: EventData) => {
        if (!word || meaningExamples || transformX === (word!.meanings.size - 1) * 100) return
        setTransformX(transformX + 100)
    }

    const handleSwipeRight = (e: EventData) => {
        if (!word || meaningExamples || transformX === 0) return
        setTransformX(transformX - 100)
    }

    const renderWordCards = () => {
        if (!word) return (<WordCardLoading />)

        const wordCards = []
        let i = 0
        for (let [key, value] of word!.meanings) {
            wordCards.push(<WordCard meaningExamples={meaningExamples} POS={key} visible={transformX === i} />)
            i += 100
        }
        return wordCards
    }

    return (
        <div className={`animationWrapper ${cardVisible ? 'visible' : ''}`}>
            <Swipeable className={`cardsContainer`} style={{ transform: 'translateX(-' + transformX + '%)' }} onSwipedLeft={handleSwipeLeft} onSwipedRight={handleSwipeRight} onSwipedDown={() => setCardVisible(false)}>
                {renderWordCards()}
            </Swipeable>
        </div>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        word: state.wordCardState.word,
        cardVisible: state.wordCardState.cardVisible,
        meaningExamples: state.wordCardState.meaningExamples,
    }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators({
    setCardVisible
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WordCardsContainer)
