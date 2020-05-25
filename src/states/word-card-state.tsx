import { atom } from 'recoil'

export const cardVisibleState = atom({
    key: 'cardVisible',
    default: false
})

export const wordState = atom({
    key: 'word',
    default: null
})

export const examplesState = atom({
    key: 'examples',
    default: null
})

export const POSState = atom({
    key: 'POS',
    default: null
})