export type ThemeState = {
    themeId: number
}
const initState: ThemeState = {
    themeId: 1,
}

export const themeReducer = (state = initState, action: ChangeThemeIdType): ThemeState => { // fix any
    switch (action.type) {
        case 'SET_THEME_ID': {
            return {
                ...state,
                themeId: action.id}
        }
        default:
            return state
    }
}

type ChangeThemeIdType = ReturnType<typeof changeThemeId>
export const changeThemeId = (id: number) => ({ type: 'SET_THEME_ID', id }) as const
