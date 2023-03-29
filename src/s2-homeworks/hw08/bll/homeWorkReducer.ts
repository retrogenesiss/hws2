import {UserType} from '../HW8'

type ActionType =
    | { type: 'sort'; payload: 'up' | 'down' }
    | { type: 'check'; payload: number }

export const homeWorkReducer = (state: UserType[], action: ActionType): UserType[] => {

    const upState = state.sort((a, b) => a.name > b.name ? 1 : -1)

    switch (action.type) {
        case 'sort': { // by name
            return action.payload === 'up'
                ? upState : state
                    ? upState.reverse() : state
        }
        case 'check': {
            return state.filter(el => el.age > action.payload)
        }
        default:
            return state
    }
}