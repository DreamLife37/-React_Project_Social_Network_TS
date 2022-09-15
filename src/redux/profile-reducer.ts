import {Dispatch} from "redux";
import {profileAPI, usersAPI} from "../api/api";
import imagePost1 from '../assets/images/sunny_day.jpg'
import imagePost2 from '../assets/images/office.jpg'
import imagePost3 from '../assets/images/interrior.jpg'
import imagePost4 from '../assets/images/car.jpg'
import imageDefaultPost from '../assets/images/net_foto.jpg'
import {getAuthUserData} from "./auth-reducer";
import {AppThunk, Nullable} from "./redux-store";
import {setIsLoading} from "./app-reducer";
import {ActionsUsersTypes, setTotalUsersCount, setUsers, toggleIsFetching, UserType} from "./users-reducer";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS_PROFILE = 'SET_STATUS_PROFILE';
const REMOVE_POST = 'REMOVE_POST';
const EDIT_POST = 'EDIT_POST';
const UPDATE_PROFILE = 'UPDATE_PROFILE';
const MY_FRIENDS = 'MY_FRIENDS';

export type ProfilePageType = {
    posts: Array<PostType>
    profile: null | ProfileType
    status: string
    myFriends: Array<UserType>
}

export type ProfileType = {
    userId: null | number | undefined
    aboutMe: string | undefined
    lookingForAJob: boolean | undefined
    lookingForAJobDescription: string | undefined
    fullName: string | undefined
    contacts: ContactsType
    photos: {
        small: undefined | string
        large: undefined | string
    }
}

type ContactsType = {
    github: undefined | string | null
    vk: undefined | string
    facebook: undefined | string
    instagram: undefined | string
    twitter: undefined | string
    website: undefined | string
    youtube: undefined | string
    mainLink: undefined | string
}

export type PostType = {
    id: number
    message: string
    likesCount: number
    image: string

}

//Автоматическая типизация AC на основе возвращаемого значения функции AC
export type ActionsProfileTypes =
    ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setStatusProfile>
    | ReturnType<typeof removePostActionCreator>
    | ReturnType<typeof editPostActionCreator>
    | ReturnType<typeof setUpdateProfile>
    | ReturnType<typeof setIsLoading>
    | ReturnType<typeof setMyFriends>

let initialState = {
    posts: [
        {
            id: 1,
            message: 'Горы, кристально чистое озеро и вокруг тишина, ты наедине с природой, что может быть лучше?😍',
            likesCount: 10,
            image: imagePost1
        },
        {id: 2, message: 'Когда работа любимая, каждый день в радость ❤', likesCount: 56, image: imagePost2},
        {
            id: 3,
            message: 'Наконец то завершился ремонт в нашем уютном домике, как Вам?😉',
            likesCount: 35,
            image: imagePost3
        },
        {
            id: 4,
            message: 'Отправились в путешествие на выходных, а Вы часто путешествуете❓',
            likesCount: 55,
            image: imagePost4
        },
    ],
    profile: {
        userId: null,
        aboutMe: '',
        lookingForAJob: false,
        lookingForAJobDescription: '',
        fullName: '',
        contacts: {
            github: '',
            vk: '',
            facebook: '',
            instagram: '',
            twitter: '',
            website: '',
            youtube: '',
            mainLink: '',
        },
        photos: {
            small: '',
            large: '',
        },
    },

    status: '',
    myFriends: []
}

export const profileReducer = (state: ProfilePageType = initialState, action: ActionsProfileTypes): ProfilePageType => {
    switch (action.type) {
        case ADD_POST: {
            // @ts-ignore
            const post = {id: 5, message: action.newText, likesCount: 205, image: imageDefaultPost}
            return {...state, posts: [post, ...state.posts,]}
        }

        case SET_USER_PROFILE: {
            // @ts-ignore
            return {...state, profile: action.profile}
        }
        case SET_STATUS_PROFILE: {
            return {...state, status: action.status}
        }

        case REMOVE_POST: {
            const postsAfterDeletion = state.posts.filter((p) => p.id !== action.id)
            return {...state, posts: postsAfterDeletion}
        }

        case EDIT_POST: {
            const postEdit = state.posts.map((p) => p.id === action.id ? {...p, message: action.newText} : p)
            return {...state, posts: postEdit}
        }

        case UPDATE_PROFILE: {
            return {...state, profile: action.updateModelProfile}
        }

        case MY_FRIENDS: {
            return {...state, myFriends: action.myFriends}
        }
        default:
            return state
    }
}

export const addPostActionCreator = (newText: string) => {
    return {
        type: ADD_POST, newText: newText
    } as const
}

export const removePostActionCreator = (id: number) => {
    return {
        type: REMOVE_POST, id
    } as const
}

export const editPostActionCreator = (id: number, newText: string) => {
    return {
        type: EDIT_POST, id, newText
    } as const
}

export const setUserProfile = (profile: ProfileType) => {
    return {
        type: SET_USER_PROFILE, profile
    } as const
}

const setStatusProfile = (status: string) => {
    return {
        type: SET_STATUS_PROFILE, status
    } as const
}

const setUpdateProfile = (updateModelProfile: ProfileType) => {
    return {
        type: UPDATE_PROFILE, updateModelProfile
    } as const
}

const setMyFriends = (myFriends: Array<UserType>) => {
    return {
        type: MY_FRIENDS, myFriends
    } as const
}

export const getUserProfile = (userId: number): AppThunk => (dispatch) => {
    dispatch(toggleIsFetching(true))
    usersAPI.getProfile(userId)
        .then(data => {
            dispatch(setUserProfile(data))
            dispatch(toggleIsFetching(false))
        })
}


export const getStatusProfile = (userId: number): AppThunk => (dispatch) => {
    dispatch(toggleIsFetching(true))
    profileAPI.getStatus(userId)
        .then((res) => {
            dispatch(setStatusProfile(res.data))
            dispatch(toggleIsFetching(false))
        })
}

export const updateStatus = (status: string): AppThunk => (dispatch) => {
    dispatch(toggleIsFetching(true))
    profileAPI.updateStatus(status)
        .then((res) => {
            dispatch(setStatusProfile(status))
            dispatch(toggleIsFetching(false))
        })
}

export const updateProfile = (updateModelProfile: ProfileType): AppThunk => (dispatch) => {
    dispatch(toggleIsFetching(true))
    profileAPI.updateProfile(updateModelProfile)
        .then((res) => {
            dispatch(setUpdateProfile(updateModelProfile))
            dispatch(getAuthUserData)
            dispatch(toggleIsFetching(false))
        })
}

export const fetchMyFriends = (): AppThunk => (dispatch) => {
    dispatch(toggleIsFetching(true))
    usersAPI.getUsers(1, 100, '', true).then(data => {
        dispatch(setMyFriends(data.items))
        dispatch(toggleIsFetching(false))
        //dispatch(setTotalUsersCount(data.totalCount))
    })
}


export const fetchUserData = (id: number): AppThunk => async (dispatch) => {
    dispatch(setIsLoading(true))
}