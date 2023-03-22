import {UserType} from '../HW8'

type ActionType =
    | { type: 'sort'; payload: 'up' | 'down' }
    | { type: 'check'; payload: number }

export const homeWorkReducer = (state: UserType[], action: ActionType): UserType[] => { // need to fix any
    switch (action.type) {
        case 'sort': { // by name
            const payload = action.payload
            return state.map(el => payload === 'up' ? {...el, _id: + 1}
                : payload === 'down' ? {...el, _id: 0} : el)
        }
        case 'check': {
            const payload = action.payload
            return state.filter(el => el.age > payload)
        }
        default:
            return state
    }
}