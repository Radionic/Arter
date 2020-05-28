import React from 'react'

import { RenderElementProps } from 'slate-react'
import { Element } from 'slate'
import ElementTypes from '../../editor/element-types'

type ParagraphElement = Element & {
    newLine: boolean
}

const Paragraph = (props: RenderElementProps) => {
    const { attributes, children, element } = props
    const e = element as ParagraphElement

    return (
        <>
            <span {...attributes} style={{ margin: '0px' }}>{children}</span>
            {e.newLine ? <br /> : null}
        </>
    )
}

export const create = () => ({
    type: ElementTypes.Paragraph,
    children: [],
    newLine: false
})

export default Paragraph
