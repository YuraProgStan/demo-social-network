import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {profileAPI} from "../api/profile-api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";

// const ADD_POST = 'SN/PROFILE/ADD-POST';
// const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
// const SET_USER_PROFILE = 'SN/PROFILE/SET_USER_PROFILE';
// const SET_STATUS = 'SN/PROFILE/SET_STATUS';
// const DELETE_POST = 'SN/PROFILE/DELETE_POST';
// const SAVE_PHOTO_SUCCESS = 'SN/PROFILE/SAVE_PHOTO_SUCCESS';

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11},
        {id: 3, message: 'Blabla', likesCount: 11},
        {id: 4, message: 'Dada', likesCount: 11}
    ] as Array<PostType>,
    // newPostText: 'it-kamasutra.com',
    profile: null as ProfileType | null,
    status: ""
    // , newPostText: ""
}
export const actions = {
    addPostActionCreator: (newPostText: string) => ({type: 'SN/PROFILE/ADD-POST', newPostText} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'SN/PROFILE/SET_USER_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'SN/PROFILE/SET_STATUS', status} as const),
    deletePost: (postId: number) => ({type: 'SN/PROFILE/DELETE_POST', postId} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: 'SN/PROFILE/SAVE_PHOTO_SUCCESS', photos} as const)
}

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/PROFILE/ADD-POST': {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,

                posts: [...state.posts, newPost]
                // newPostText: ''
            };
            //stateCopy.posts = [...state.posts];
            //stateCopy.posts.push(newPost);
            // stateCopy.newPostText = '';
            // return stateCopy;
        }


        // case UPDATE_NEW_POST_TEXT: {
        //     return {
        //         ...state,
        //         newPostText: action.newText
        //     };
        // }

        case 'SN/PROFILE/SET_USER_PROFILE': {
            return {...state, profile: action.profile}
        }
        case 'SN/PROFILE/SET_STATUS': {
            return {...state, status: action.status}
        }
        case 'SN/PROFILE/DELETE_POST': {
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)}
        }
        case 'SN/PROFILE/SAVE_PHOTO_SUCCESS': {
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        }
        default:
            return state;
    }
}
// type AddPostActionCreatorActionType = {
//     type: typeof  ADD_POST
//     newPostText: string
// }
// export const addPostActionCreator = (newPostText: string): AddPostActionCreatorActionType => ({type: ADD_POST, newPostText});
// type SetUserProfileActionType = {
//     type: typeof SET_USER_PROFILE
//     profile: ProfileType
// }
// export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, profile});
// type SetStatusActionType = {
//     type: typeof SET_STATUS
//     status: string
// }
// export const setStatus = (status: string): SetStatusActionType => ({type: SET_STATUS, status});
// type DeletePostActionType = {
//     type: typeof DELETE_POST
//     postId: number
// }
// export const deletePost = (postId: number): DeletePostActionType => ({type: DELETE_POST, postId});
// type SavePhotoSuccessActionType = {
//     type: typeof SAVE_PHOTO_SUCCESS
//     photos: PhotosType
// }
// export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS, photos});
// export const updateNewPostTextActionCreator = (text) =>
//     ({ type: UPDATE_NEW_POST_TEXT, newText: text });


export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getProfile(userId);
    dispatch(actions.setUserProfile(data));
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(data));
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        const data = await profileAPI.updateStatus(status)
        if (data.resultCode === 0) {
            dispatch(actions.setStatus(status));
        }
    } catch (error) {

    }
}
export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    const data = await profileAPI.savePhoto(file)
    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos));
    }
}
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const data = await profileAPI.saveProfile(profile)
    if (data.resultCode === 0) {
        if (userId!==null) {
        dispatch(getUserProfile(userId));
        }
        else {
            throw new Error("userId can\'t be null")
        }
    } else {
        //  dispatch(stopSubmit("edit-profile", {"contacts": {"facebook": response.data.messages[0]} }));
        dispatch(stopSubmit("edit-profile", {_error: data.messages[0]}));
        return Promise.reject(data.messages[0]);
    }
}


export default profileReducer;

type ActionsType = InferActionsTypes<typeof actions>
export type InitialStateType = typeof initialState
type ThunkType = BaseThunkType<ActionsType | FormAction>