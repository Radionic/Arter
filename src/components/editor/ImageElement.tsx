import React from 'react'

import { RenderElementProps, useSelected, useFocused } from 'slate-react'

const ImageElement = (props: RenderElementProps) => {
    const { attributes, children, element } = props
    const selected = useSelected()
    const focused = useFocused()
    
    return (
        <div {...attributes}>
            <div contentEditable={false}>
                <img
                    src={element.url as string}
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

export default ImageElement