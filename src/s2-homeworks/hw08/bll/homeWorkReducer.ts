import {UserType} from '../HW8'

type ActionType =
    | { type: 'sort'; payload: 'up' | 'down' }
    | { type: 'check'; payload: number }

export const homeWorkReducer = (state: UserType[], action: ActionType): UserType[] => { // need to fix any
    switch (action.type) {
        case 'sort': { // by name
            const payload = action.payload
            const copyState = state.map(el => ({...el}))
            const upState = copyState.sort((a, b) => a.name > b.name ? 1 : -1)

            return payload === 'up' ? upState : state ? copyState.reverse() : state
        }
        case 'check': {
            const payload = action.payload
            return state.filter(el => el.age > payload)
        }
        default:
            return state
    }
}

//  return state.map(el => payload === 'up' ? {...el, _id: +1}
//                 : payload === 'down' ? {...el, _id: 0} : el)