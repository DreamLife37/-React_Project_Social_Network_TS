import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import {dialogsReducer} from "./dialogs-reducer";
import {ActionsProfileTypes, profileReducer} from "./profile-reducer";
import {ActionsUsersTypes, usersReducer} from "./users-reducer";
import {ActionsAuthTypes, authReducer} from "./auth-reducer";
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import {reducer as formReducer} from 'redux-form';
import {ActionsAppTypes, appReducer} from "./app-reducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";

export const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})
export let store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppStateType = ReturnType<typeof rootReducer>
export type ReduxStoreType = typeof store

export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector

export type RootAppActionsType = ActionsProfileTypes
    | ActionsAuthTypes
    | ActionsUsersTypes
    | ActionsAppTypes

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    AppStateType,
    unknown,
    AnyAction>

export type Nullable<T> = null | T

// @ts-ignore
window.store = store

