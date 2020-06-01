import React, { useCallback } from 'react'

import { ReactEditor, RenderElementProps } from 'slate-react'
import { Transforms, Range } from 'slate'

import isImage from 'is-image'
import isUrl from 'is-url'
import Word from '../models/word'

import ElementTypes from './element-types'
import Image, { create as createImageElement } from '../components/editor/Image'
import QuickMeaning, { create as createQuickMeaningElement } from '../components/editor/QuickMeaning'
import Paragraph from '../components/editor/Paragraph'

type MyReactEditor = ReactEditor & {
    insertQuickMeaning: (domRange: globalThis.Range, word: Word, meaning: string) => void
}

export const withMyEditor = (editor: ReactEditor): MyReactEditor => {
    const { insertData } = editor

    editor.insertQuickMeaning = (domRange: globalThis.Range, word: Word, meaning: string): void => {
        insertQuickMeaning(editor, domRange, word, meaning)
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

    return editor as MyReactEditor
}

export const renderMyElement = (props: RenderElementProps): JSX.Element => {
    const { element } = props

    switch (element.type) {
        case ElementTypes.QuickMeaning:
            return <QuickMeaning {...props} />
        case ElementTypes.Image:
            return <Image {...props} />
        default:
            return <Paragraph {...props} />
    }
}

const insertImage = (editor: ReactEditor, url: string): void => {
    const imageElement = createImageElement(url)
    Transforms.insertNodes(editor, imageElement)
}

const insertQuickMeaning = (editor: ReactEditor, domRange: globalThis.Range, word: Word, meaning: string): void => {
    const quickMeaningElement = createQuickMeaningElement(meaning, word)

    const range = ReactEditor.toSlateRange(editor, domRange)
    Transforms.select(editor, range!)

    const endPoint = Range.end(editor.selection!)
    Transforms.insertNodes(editor, quickMeaningElement, { at: endPoint })
    Transforms.setNodes(editor, {
        newLine: false
    })
}
