import React from 'react'

import { RenderElementProps } from 'slate-react'
import Word from '../../models/word'

const QuickMeaning = (props: RenderElementProps) => {
    const { element } = props

    return (
        <span> ({(element.word as Word).word})</span>
    )
}

export default QuickMeaning