import { ViewActions, PreferenceActions, WordCardActions } from './action-types'

import Page from '../pages/page'
import Word from '../models/word'

export const setPage = (page: Page) => ({ type: ViewActions.SET_PAGE, page })

export const setWord = (word: Word | null) => ({ type: WordCardActions.SET_WORD, word })

export const setCardVisible = (visible: boolean) => ({ type: WordCardActions.SET_CARD_VISIBLE, visible })

export const setMeaningExamples = (meaningExamples: string | null) => ({ type: WordCardActions.SET_MEANING_EXAMPLES, meaningExamples})

export const setEditMode = (editable: boolean) => ({ type: ViewActions.SET_EDIT_MODE, editable })

export const setDrawerVisible = (visible: boolean) => ({ type: ViewActions.SET_DRAWER_VISIBLE, visible })

export const setDialogVisible = (visible: boolean) => ({ type: ViewActions.SET_DIALOG_VISIBLE, visible })

export const setLeftRightPadding = (padding: number) => ({ type: PreferenceActions.SET_LEFT_RIGHT_PADDING, padding })

export const setTopBottomPadding = (padding: number) => ({ type: PreferenceActions.SET_TOP_BOTTOM_PADDING, padding })

export const setSpellcheck = (spellcheck: boolean) => ({ type: PreferenceActions.SET_SPELLCHECK, spellcheck })

