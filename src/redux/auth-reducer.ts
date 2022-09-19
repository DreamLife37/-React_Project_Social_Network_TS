import {authAPI, profileAPI, usersAPI} from "../api/api";
import {AppThunk} from "./redux-store";
import {getStatusProfile, getUserProfile} from "./profile-reducer";
import {setIsLoading} from "./app-reducer";
import {handleServerNetworkError} from "../components/common/Utils/errorHandler";

const SET_USER_DATA = 'SET-USER-DATA'
const SET_MY_PHOTO = 'SET-MY-PHOTO'

export type AuthPageType = {
    id: null | number
    email: null | string
    login: null | string
    isAuth: boolean
    isFetching: boolean
    photo: string
}

//Автоматическая типизация AC на основе возвращаемого значения функции AC
export type ActionsAuthTypes = ReturnType<typeof setUserData>
    | ReturnType<typeof setMyPhoto>

let initialState: AuthPageType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: true,
    photo: ''
}

export const authReducer = (state: AuthPageType = initialState, action: ActionsAuthTypes): AuthPageType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }

        case SET_MY_PHOTO:
            return {
                ...state,
                photo: action.photo
            }

        default:
            return state
    }
}

type UserDataType = {
    id: null | number
    email: null | string
    login: null | string
}

export const setUserData = (id: null | number,
                            email: null | string,
                            login: null | string,
                            isAuth: boolean) => {
    return {
        type: SET_USER_DATA,
        payload: {id, email, login, isAuth}
    } as const
}

export const setMyPhoto = (photo: string) => {
    return {
        type: SET_MY_PHOTO,
        photo: photo
    } as const
}

export const getAuthUserData = (): AppThunk => {
    return (dispatch) => {
        return usersAPI.getAuthMe()
            .then(data => {
                if (data.resultCode === 0) {
                    let {id, login, email} = data.data
                    dispatch(setUserData(id, email, login, true))
                    profileAPI.getProfile(id)
                        .then(res => {
                            dispatch(setMyPhoto(res.photos.small))
                        })
                } else {
                    handleServerNetworkError(dispatch, data.messages[0])
                }
            })
            .finally(() => {
                dispatch(setIsLoading(false))
            })
    }
}

export const getMyProfile = (): AppThunk => {
    return (dispatch) => {
        return usersAPI.getAuthMe()
            .then(data => {
                if (data.resultCode === 0) {
                    let {id, login, email} = data.data
                    dispatch(setUserData(id, email, login, true))
                    dispatch(getUserProfile(id))
                    dispatch(getStatusProfile(id))
                } else {
                    handleServerNetworkError(dispatch, data.messages[0])
                }
            })
            .finally(() => {
                dispatch(setIsLoading(false))
            })
    }
}

export const login = (email: string, password: string, rememberMe: boolean, setStatus: any): AppThunk => {
    let data = {
        email, password, rememberMe
    }
    return (dispatch) => {
        authAPI.login(data)
            .then(data => {
                if (data.data.resultCode === 0) {
                    dispatch(getAuthUserData())
                } else {
                    handleServerNetworkError(dispatch, data.data.messages[0])
                }
            })
    }
}


export const logout = (): AppThunk => {
    return (dispatch) => {
        authAPI.logout()
            .then(data => {
                if (data.data.resultCode === 0) {
                    dispatch(setUserData(null, null, null, false))
                } else {
                    handleServerNetworkError(dispatch, data.data.messages[0])
                }
            })
            .finally(() => {
                dispatch(setIsLoading(false))
            })


    }
}


