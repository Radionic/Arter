import React, { useState, useMemo, useEffect } from 'react'
import { makeStyles } from '@material-ui/core'

import { createEditor, Node } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { withMyEditor, renderMyElement } from '../plugin/editor/with-my-editor'

import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import { connect } from 'react-redux'
import { AppState } from '../redux/reducers'
import { setWord, setCardVisible } from '../redux/actions'

import Word from '../models/word'
import WordRequest from '../network/word-request'

import EditorHelperFunctions from '../plugin/editor/editor-helper-functions'

import { Plugins } from '@capacitor/core'

type MyEditorProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const useStyle = makeStyles({
    editor: (props: MyEditorProps) => ({
        padding: `${props.topBottomPadding}px ${props.leftRightPadding}px ${props.topBottomPadding}px ${props.leftRightPadding}px`,
        userSelect: 'text'
    })
})

const { Storage } = Plugins

const MyEditor: React.FC<MyEditorProps> = (props) => {
    const { cardVisible, editMode } = props
    const { setCardVisible } = props

    const { spellcheck } = props
    const { setWord } = props
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

    const classes = useStyle(props)

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
            onClick={handleClick}> { /* cannot listen to most of the DOM events when 'readOnly' is true, so we have to wrap the <Editable> with <div> */ }
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
                    className={classes.editor} />
            </Slate>
        </div >
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        cardVisible: state.wordCardState.cardVisible,
        editMode: state.viewState.editMode,
        leftRightPadding: state.preferenceState.leftRightPadding,
        topBottomPadding: state.preferenceState.topBottomPadding,
        spellcheck: state.preferenceState.spellcheck
    }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators({
    setWord,
    setCardVisible
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyEditor)
