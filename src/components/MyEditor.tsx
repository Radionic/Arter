import React, { useState, useMemo, useEffect } from 'react'

import { createEditor, Node } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { withMyEditor, renderMyElement } from '../plugin/editor/with-my-editor'

import { useRecoilState, useRecoilValue } from 'recoil'
import { editModeState } from '../states/app-state'
import { spellcheckState, paddingStyleState } from '../states/preference-state'
import { cardVisibleState, wordState } from '../states/word-card-state'

import Word from '../models/word'
import WordRequest from '../network/word-request'

import EditorHelperFunctions from '../plugin/editor/editor-helper-functions'

import { Plugins } from '@capacitor/core'

const { Storage } = Plugins

const MyEditor: React.FC = props => {
    const [cardVisible, setCardVisible] = useRecoilState(cardVisibleState)
    const [editMode, setEditMode] = useRecoilState(editModeState)
    const [spellcheck, setSpellcheck] = useRecoilState(spellcheckState)
    const [word, setWord] = useRecoilState(wordState)
    const paddingStyle = useRecoilValue(paddingStyleState)

    const [value, setValue] = useState<Node[]>([])

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

        const word = EditorHelperFunctions.getWord()
        if (word) {
            EditorHelperFunctions.selectWord(editor)
            setWord(null)
            setCardVisible(true)

            new WordRequest(word).make().then((myWord: Word) => {
                (editor as any).insertQuickMeaning(myWord)
                setWord(myWord)
            }).catch((e) => {

            })
        }
    }

    return (
        <div
            onClick={handleClick}> { /* cannot listen to most of the DOM events when 'readOnly' is true, so we have to wrap the <Editable> with <div> */}
            <Slate editor={editor} value={value} onChange={(value) => {
                setValue(value)
                Storage.set({
                    key: 'content',
                    value: JSON.stringify(value)
                })
            }}>
                <Editable
                    renderElement={props => renderMyElement(props)}
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
}

export default MyEditor
