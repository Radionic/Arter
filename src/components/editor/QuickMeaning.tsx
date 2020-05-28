import React from 'react'

import { RenderElementProps } from 'slate-react'
import { Element } from 'slate'
import ElementTypes from '../../editor/element-types'

import Word from '../../models/word'

type QuickMeaningElement = Element & {
    word: Word
}

const QuickMeaning = (props: RenderElementProps) => {
    const { children } = props

    return <span> ({children})</span>
}

export const create = (meaning: string, word: Word) => ({
    type: ElementTypes.QuickMeaning,
    children: [{ 'text': meaning }],
    word
})

export default QuickMeaning
