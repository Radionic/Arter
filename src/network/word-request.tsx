import Request from './request'
import Word from '../models/word'
import { HTTP } from '@ionic-native/http'

export default class WordRequest extends Request<Word> {
    private word: string = ''

    constructor(word: string) {
        super()
        this.word = word
    }

    make(): Promise<Word> {
        return new Promise((resolve, reject) => {
            HTTP.get(`https://dictionary.cambridge.org/dictionary/english-chinese-traditional/${this.word}`, {}, {})
                .then(res => {
                    if (res.url === 'https://dictionary.cambridge.org/dictionary/english-chinese-traditional/') {
                        const myWord = new Word('Undefined!')
                        myWord.meanings.set('noun', ['not defineddd!!'])
                        myWord.orgWord.set('noun', 'Undefined!')
                        reject()
                    }
                    resolve(this.handleResponse(res.data))
                })
        })
    }

    handleResponse(resData: any): Word {
        const myWord = new Word(this.word)

        const doc: Document = new DOMParser().parseFromString(resData, 'text/html')
        const entryBodies: NodeListOf<Element> = doc.querySelectorAll('.entry-body__el')
        for (let entryBody of entryBodies) {
            /*
                entryBody:
                <POSHeader>
                    <orgWord />
                    <pos />
                    <UKVoice />
                    <USVoice />
                </POSHeader>
                <meaning />
                <example />
                <example />
                <meaning />
                <example />
            */
            const POSHeader = entryBody.querySelector('.pos-header.dpos-h')!
            const partOfSpeechEl = POSHeader.querySelector('.pos.dpos')! // TODO: More than 1 part of speech
            if (partOfSpeechEl == null) continue // TODO: no POS, e.g.: HI
            const partOfSpeech = partOfSpeechEl.textContent!

            const voicesEls = POSHeader.getElementsByTagName('source')
            const UKVoiceLink = 'https://dictionary.cambridge.org/' + voicesEls[0].getAttribute('src')
            const USVoiceLink = 'https://dictionary.cambridge.org/' + voicesEls[2].getAttribute('src')
            myWord.pronunciation.set(partOfSpeech, [UKVoiceLink, USVoiceLink])

            const orgWord = POSHeader.querySelector('.hw.dhw')!.textContent!
            myWord.orgWord.set(partOfSpeech, orgWord)

            const meaningsAndExamplesEls: NodeListOf<Element> = entryBody.querySelectorAll('.trans.dtrans.dtrans-se')
            const meaningsList = myWord.meanings.set(partOfSpeech, []).get(partOfSpeech)!

            let currentMeaning = ''

            for (let i = 0; i < meaningsAndExamplesEls.length; i++) {
                const el = meaningsAndExamplesEls[i]

                if (!el.classList.contains('hdb')) { //<meaning>
                    currentMeaning = el.textContent!
                    meaningsList.push(currentMeaning)
                } else { //<example>
                    if (myWord.translatedExamples.get(currentMeaning) == null) {
                        myWord.translatedExamples.set(currentMeaning, [])
                        myWord.englishExamples.set(currentMeaning, [])
                    }

                    const trEx = el.textContent!
                    const engEx = el.previousElementSibling?.textContent!
                    myWord.translatedExamples.get(currentMeaning)!.push(trEx)
                    myWord.englishExamples.get(currentMeaning)!.push(engEx)
                }
            }
        }
        return myWord
    }
}