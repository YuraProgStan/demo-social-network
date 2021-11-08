import {getAuthUserData} from './auth-reducer';
import {InferActionsTypes} from "./redux-store";

let initialState = {
 initialized: false
 };
export type InitialStateType = typeof initialState

type ActionsType = InferActionsTypes<typeof actions>

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'SN/APP/INITIALIZED_SUCCESS':
      return {
        ...state,
        initialized: true
      }
    default: return state;
  }
}
// type InitializedSuccessActionType = {
//     type: typeof INITIALIZED_SUCCESS //'INITIALIZED_SUCCESS'
// }
export const actions = {
    initializedSuccess: () => ({ type: 'SN/APP/INITIALIZED_SUCCESS'} as const)
}
// export const initializedSuccess = (): InitializedSuccessActionType => ({ type: INITIALIZED_SUCCESS});

export const initializeApp = () => (dispatch: any) => {
let promise = dispatch(getAuthUserData());
//dispatch(somethingelse());
//dispatch(somethingelse());
Promise.all([promise]).then (() => {
  dispatch(actions.initializedSuccess());
})}

export default appReducer;