import React from 'react'

import { RenderElementProps, useSelected, useFocused } from 'slate-react'
import { Element } from 'slate'
import ElementTypes from '../../editor/element-types'

type ImageElement = Element & {
    url: string
}

const Image = (props: RenderElementProps) => {
    const { attributes, children, element } = props
    const selected = useSelected()
    const focused = useFocused()

    const e = element as ImageElement
    
    return (
        <div {...attributes}>
            <div contentEditable={false}>
                <img
                    src={e.url}
                    style={{
                        display: 'block',
                        width: '100%',
                        boxShadow: `${selected && focused ? '0 0 0 3px #B4D5FF' : 'none'}`
                    }}
                />
                {children}
            </div>
        </div>
    )
}

export const create = (url: string) => ({
    type: ElementTypes.Image,
    children: [{'text': ''}],
    url
})

export default Image
