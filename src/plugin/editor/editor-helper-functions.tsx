import { Editor, Transforms } from 'slate'
import { ReactEditor } from 'slate-react'

const getWord = (): string | null => {
    const selection = window.getSelection()

    if (selection == null || selection.anchorNode == null || selection.anchorNode.textContent == null) return null

    const para = selection.anchorNode.textContent,
        offset = selection.anchorOffset

    var left = para.slice(0, offset).search(/\w+$/),
        right = para.slice(offset).search(/\W/)

    if (left === -1) {
        // abc |def
        left = offset
    }

    if (right === -1) {
        // abc |d|e|f|
        return para.slice(left)
    }

    return para.slice(left, right + offset)
}

const selectWord = (editor: ReactEditor): void => {
    // TODO: select words with typo e.g. without fullstop
    const selection = window.getSelection()

    if (selection == null || selection.anchorNode == null || selection.anchorNode.textContent == null || !selection.isCollapsed) return

    const node = selection.anchorNode,
        para = node.textContent!,
        offset = selection.anchorOffset

    var left = para.slice(0, offset).search(/\w+$/),
        right = para.slice(offset).search(/\W/)

    if (left === -1) {
        // abc |def
        left = offset
    }

    if (right === -1) {
        // abc |d|e|f|
        right = para.length - left - offset
    }

    const domRange = document.createRange()
    domRange.setStart(node, left)
    domRange.setEnd(node, offset + right)

    selection.removeAllRanges()
    selection.addRange(domRange)

    const range = ReactEditor.toSlateRange(editor, domRange)
    Transforms.select(editor, range)
}

const EditorHelperFunctions = {
    ...Editor,
    getWord,
    selectWord
}

export default EditorHelperFunctions