export default class Word {
    //TODO: field specific words (e.g. medication, language, engineering)
    word: string
    orgWord: Map<string, string> = new Map() // <pos, orgWord>
    meanings: Map<string, string[]> = new Map() // <pos, meanings[]>
    translatedExamples: Map<string, string[]> = new Map() // <meaning, examples[]>
    englishExamples: Map<string, string[]> = new Map() // <meaning, examples[]>
    pronunciation: Map<string, string[]> = new Map() // <pos, links[]>

    constructor(word: string) {
        this.word = word
    }
}