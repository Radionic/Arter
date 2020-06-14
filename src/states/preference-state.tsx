import { atom, selector } from 'recoil'

export const paddingState = atom({
    key: 'padding',
    default: {
        leftRight: 16,
        topBottom: 16
    },
})

export const paddingStyleState = selector({
    key: 'paddingStyle',
    get: ({get}: any) => {
        const padding = get(paddingState)
        return `${padding.topBottom}px ${padding.leftRight}px ${padding.topBottom}px ${padding.leftRight}px`
    }
})

export const spellcheckState = atom({
    key: 'spellcheck',
    default: false
})

export const autosaveState = atom({
    key: 'autosave',
    default: true
})
