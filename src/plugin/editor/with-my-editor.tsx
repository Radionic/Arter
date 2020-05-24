import React from 'react'
import ImageElement from '../../components/editor/ImageElement'

import { ReactEditor, RenderElementProps } from 'slate-react'
import { Transforms, Range } from 'slate'

import isImage from 'is-image'
import isUrl from 'is-url'
import Word from '../../models/word'
import QuickMeaning from '../../components/editor/QuickMeaning'

export const withMyEditor = (editor: ReactEditor): ReactEditor => {
    const { insertData } = editor

    editor.insertQuickMeaning = (word: Word) => {
        insertQuickMeaning(editor, word)
    }

    editor.insertData = (data: DataTransfer) => {
        const text = data.getData('text/plain')

        if (isUrl(text) && isImage(text)) {
            //TODO: xxx.JPG?token=...
            insertImage(editor, text)
            return
        }
        insertData(data)
    }

    return editor
}

export const renderMyElement = (props: RenderElementProps): JSX.Element => {
    const { attributes, children, element } = props

    switch (element.type) {
        case 'qm':
            return <QuickMeaning {...props} />
        case 'img':
            return <ImageElement {...props} />
        default:
            return <span {...attributes} style={{margin: '0px', display: 'inline'}}>{children}</span>
    }
}

const insertImage = (editor: ReactEditor, url: string): void => {
    const text = { text: '' }
    const image = { type: 'img', url, children: [text] }
    Transforms.insertNodes(editor, image)
}

const insertQuickMeaning = (editor: ReactEditor, word: Word): void => {
    const quickMeaning = { type: 'qm', word, children: []}

    const endPoint = Range.end(editor.selection!)
    Transforms.insertNodes(editor, quickMeaning, { at: endPoint })
}