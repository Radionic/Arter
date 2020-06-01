import React, { useState, useEffect } from 'react'
import { Swipeable, EventData } from 'react-swipeable'

import WordCard from './WordCard'
import WordCardLoading from './WordCardLoading'

import { useRecoilState } from 'recoil'
import { cardVisibleState, wordState, examplesState } from '../../states/word-card-state'

import useStyles from '../../styles/word-card/word-cards-container-style'
import clsx from 'clsx'

const WordCardsContainer: React.FC = props => {
    const [transformX, setTransformX] = useState<number>(0)

    const [cardVisible, setCardVisible] = useRecoilState(cardVisibleState)
    const [word, ] = useRecoilState(wordState)
    const [examples, ] = useRecoilState(examplesState)

    const classes = useStyles()

    useEffect(() => {
        if (cardVisible && transformX != 0) setTransformX(0)
    }, [cardVisible])

    const handleSwipeLeft = (e: EventData) => {
        if (!word || examples || transformX === (word!.meanings.size - 1) * 100) return
        setTransformX(transformX + 100)
    }

    const handleSwipeRight = (e: EventData) => {
        if (!word || examples || transformX === 0) return
        setTransformX(transformX - 100)
    }

    const renderWordCards = () => {
        if (!word) return (<WordCardLoading />)

        const wordCards = []
        let i = 0
        for (let [key, ] of word!.meanings) {
            wordCards.push(<WordCard visible={transformX === i} POS={key} />)
            i += 100
        }
        return wordCards
    }

    return (
        <div className={clsx(classes.animationWrapper, { 'visible': cardVisible })}>
            <Swipeable className={classes.cardsContainer} style={{ transform: 'translateX(-' + transformX + '%)' }} onSwipedLeft={handleSwipeLeft} onSwipedRight={handleSwipeRight} onSwipedDown={() => setCardVisible(false)}>
                {renderWordCards()}
            </Swipeable>
        </div>
    )
}

export default React.memo(WordCardsContainer)
