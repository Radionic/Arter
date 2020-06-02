// Get the string of a word in a paragraph through Selection object
const getWord = (): string | null => {
    const selection = window.getSelection()

    if (!selection || !selection.anchorNode || !selection.anchorNode.textContent) return null

    const para = selection.anchorNode.textContent,
        offset = selection.anchorOffset

    var left = para.slice(0, offset).search(/\w+$/),
        right = para.slice(offset).search(/\W/)

    if (left === -1) { // user clicks at the first character of the first word of a paragraph
        left = offset
    }

    if (right === -1) { // punctuations or whitespace does not exist after a word or a QuickMeaning component is next to this word
        return para.slice(left)
    }

    return para.slice(left, right + offset)
}

/*
* Normally, when user clicks at 
* 1. the whitespace between two words, it will select the word in the left
* 2. a character of a word, it will select the word containing that character
* and return the Range object of the word
*/
const selectWord = (): Range | null => {
    // TODO: select words with typo e.g. without fullstop
    const selection = window.getSelection()

    if (!selection || !selection.anchorNode || !selection.anchorNode.textContent || !selection.isCollapsed) return null

    const node = selection.anchorNode,
        para = node.textContent!,
        offset = selection.anchorOffset

    var left = para.slice(0, offset).search(/\w+$/),
        right = para.slice(offset).search(/\W/)

    if (left === -1) { // user clicks at the first character of the first word of a paragraph
        left = offset
    }

    if (right === -1) { // punctuations or whitespace does not exist after a word or a QuickMeaning component is next to this word
        right = para.length - offset
    }

    const domRange = document.createRange()
    domRange.setStart(node, left)
    domRange.setEnd(node, offset + right)

    selection.removeAllRanges()
    selection.addRange(domRange)

    return domRange
}

const domEditor = {
    getWord,
    selectWord
}

export default domEditor
