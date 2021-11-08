import {Action, applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import navbarReducer from "./navbar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reducer";

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    navBar: navbarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

type RootReducerType = typeof rootReducer // (globalState: AppStateType) => AppStateType
export type AppStateType = ReturnType<RootReducerType>

// type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
// export type InferActionsTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>
export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

// type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>
export type BaseThunkType <A extends Action, R = Promise<void>> = ThunkAction<Promise<void>, AppStateType, unknown, A>

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

// @ts-ignore
window._store_ = store
export default store
