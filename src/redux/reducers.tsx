import { combineReducers, AnyAction } from 'redux'
import { ViewActions, PreferenceActions, WordCardActions } from './action-types'

import Page from '../pages/page'
import Word from '../models/word'

interface ViewState {
    page: Page,
    cardVisible: false,
    editMode: boolean,
    dialogVisible: boolean,
    drawerVisible: boolean,
}

const initialViewState: ViewState = {
    page: Page.MainActivity,
    cardVisible: false,
    editMode: false,
    dialogVisible: false,
    drawerVisible: false,
}

interface PreferenceState {
    leftRightPadding: number,
    topBottomPadding: number,
    spellcheck: boolean,
}

const initialPreferenceState: PreferenceState = {
    leftRightPadding: 12,
    topBottomPadding: 12,
    spellcheck: true,
}

interface WordCardState {
    word: Word | null,
    cardVisible: boolean,
    meaningExamples: string | null,
}

const initialWordCardState: WordCardState = {
    word: null,
    cardVisible: false,
    meaningExamples: null,
}

const viewReducer = (state = initialViewState, action: any) => {
    var newState
    switch (action.type) {
        case ViewActions.SET_PAGE:
            newState = { page: action.page }
            return { ...state, ...newState }
        case ViewActions.SET_EDIT_MODE:
            newState = { editMode: action.editable }
            return { ...state, ...newState }
        case ViewActions.SET_DRAWER_VISIBLE:
            newState = { drawerVisible: action.visible }
            return { ...state, ...newState }
        case ViewActions.SET_DIALOG_VISIBLE:
            newState = { dialogVisible: action.visible }
            return { ...state, ...newState }
    }
    return state
}

const preferenceReducer = (state = initialPreferenceState, action: AnyAction) => {
    var newState
    switch (action.type) {
        case PreferenceActions.SET_LEFT_RIGHT_PADDING:
            newState = { leftRightPadding: action.padding }
            return { ...state, ...newState }
        case PreferenceActions.SET_TOP_BOTTOM_PADDING:
            newState = { topBottomPadding: action.padding }
            return { ...state, ...newState }
        case PreferenceActions.SET_SPELLCHECK:
            newState = { spellcheck: action.spellcheck }
            return { ...state, ...newState }
    }
    return state
}

const wordCardReducer = (state = initialWordCardState, action: AnyAction) => {
    var newState
    switch (action.type) {
        case WordCardActions.SET_CARD_VISIBLE:
            newState = { cardVisible: action.visible }
            return { ...state, ...newState }
        case WordCardActions.SET_WORD:
            newState = { word: action.word }
            return { ...state, ...newState }
        case WordCardActions.SET_MEANING_EXAMPLES:
            newState = { meaningExamples: action.meaningExamples }
            return { ...state, ...newState }
    }
    return state
}

const rootReducer = combineReducers({
    viewState: viewReducer,
    preferenceState: preferenceReducer,
    wordCardState: wordCardReducer
})

export default rootReducer

export type AppState = {
    viewState: ViewState,
    preferenceState: PreferenceState,
    wordCardState: WordCardState
}