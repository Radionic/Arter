import { atom } from 'recoil'

import Page from '../pages/page'

export const pageState = atom({
    key: 'page',
    default: Page.MainActivity,
})

export const editModeState = atom({
    key: 'editMode',
    default: false
})

export const drawerVisibleState = atom({
    key: 'drawerVisible',
     default: false
})