import React, { useState, useMemo, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react'
import { useThrottleFn } from 'react-use'

import { createEditor, Node } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { withMyEditor, renderMyElement } from '../editor/with-my-editor'

import { useRecoilState, useRecoilValue } from 'recoil'
import { editModeState } from '../states/app-state'
import { spellcheckState, paddingStyleState, autosaveState } from '../states/preference-state'
import { cardVisibleState, wordState } from '../states/word-card-state'

import Word from '../models/word'
import WordRequest from '../network/word-request'

import domEditor from '../editor/dom-editor'

import { Plugins } from '@capacitor/core'

export interface MyEditorRef {
    saveContent: () => void
}

const { Storage } = Plugins

const MyEditor = forwardRef((props, ref) => {
    // app state
    const [editMode,] = useRecoilState(editModeState)

    // preference state
    const [spellcheck,] = useRecoilState(spellcheckState)
    const [autosave,] = useRecoilState(autosaveState)
    const paddingStyle = useRecoilValue(paddingStyleState)

    // word card state
    const [cardVisible, setCardVisible] = useRecoilState(cardVisibleState)
    const [, setWord] = useRecoilState(wordState)

    const [value, setValue] = useState<Node[]>([])

    const saveContent = (v?: Node[]) => {
        const val = v ?? value
        Storage.set({
            key: 'content',
            value: JSON.stringify(val)
        })
    }

    useImperativeHandle(ref, () => ({
        saveContent
    }), [value])

    useEffect(() => {
        Storage.get({ key: 'content' }).then(contentStr => {
            if (contentStr.value != null && contentStr.value !== '[]') {
                setValue(JSON.parse(contentStr.value!))
            } else {
                setValue([{
                    type: 'paragraph',
                    children: [{ text: 'Nice to meet you here!' }]
                }])
            }
        })
    }, [])

    useThrottleFn((v) => {
        if (autosave) saveContent(v)
    }, 1000, [value, autosave])

    const editor = useMemo(
        () => withMyEditor(withReact(createEditor())),
        []
    )

    const handleClick = () => {
        if (editMode) return

        if (cardVisible) setCardVisible(false)
    }

    const handleDoubleClick = () => {
        if (editMode) return

        const word = domEditor.getWord()
        const domRange = domEditor.selectWord()
        if (word && domRange) {
            setWord(null)
            setCardVisible(true)

            new WordRequest(word).make().then((myWord: Word) => {
                editor.insertQuickMeaning(domRange, myWord, myWord.word)
                setWord(myWord)
            }).catch((e) => {

            })
        }
    }

    const memoRenderMyElement = useCallback(renderMyElement, [])

    return (
        <div
            onClick={handleClick}> { /* cannot listen to most of the DOM events when 'readOnly' is true, so we have to wrap the <Editable> with <div> */ }
            <Slate editor={editor} value={value} onChange={value => setValue(value)}>
                <Editable
                    renderElement={memoRenderMyElement}
                    placeholder='Place the article here!'
                    spellCheck={spellcheck}
                    readOnly={!editMode}
                    onDoubleClick={handleDoubleClick}
                    style={{
                        padding: paddingStyle,
                        userSelect: 'text'
                    }}
                />
            </Slate>
        </div >
    )
})

export default MyEditor
