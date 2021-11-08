import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import navbarReducer from "./navbar-reducer";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';
let store = {
    _state: {
        profilePage: {
            posts: [
                { id: 1, message: 'Hi, how are you?', likesCount: 12 },
                { id: 2, message: 'It\'s my first post', likesCount: 11 },
                { id: 3, message: 'Blabla', likesCount: 11 },
                { id: 4, message: 'Dada', likesCount: 11 }
            ],
            newPostText: 'it-kamasutra.com'
        },
        dialogsPage: {
            dialogs: [
                { id: 1, name: 'Dimych' },
                { id: 2, name: 'Andrew' },
                { id: 3, name: 'Sveta' },
                { id: 4, name: 'Sasha' },
                { id: 5, name: 'Viktor' },
                { id: 6, name: 'Valera' }
            ],
            messages: [
                { id: 1, message: 'Hi' },
                { id: 2, message: 'How is your it-kamasutra?' },
                { id: 3, message: 'Yo' },
                { id: 4, message: 'Yo' },
                { id: 5, message: 'Yo' }
            ],
            newMessageText: 'Hello'
        },
        navBar: {
            navbar: [
                { to: '/profile', profile: 'Profile' },
                { to: '/dialogs', profile: 'Messages' },
                { to: '/news', profile: 'News' },
                { to: '/music', profile: 'Music' },
                { to: '/settings', profile: 'Settings' }
            ],
            friends: [
                { title: 'Friends' },
                { friendname: 'Andrew', avatarClassName: 1 },
                { friendname: 'Sasha', avatarClassName: 2 },
                { friendname: 'Sveta', avatarClassName: 3 }]

        }
    },
    _callSubscriber() {
        console.log('State changed');
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    addPost() {
        let newPost = {
            id: 5,
            message: this._state.profilePage.newPostText,
            likesCount: 0
        };
        this._state.profilePage.posts.push(newPost);
        this._state.profilePage.newPostText = '';
        this._callSubscriber(this._state);
    },
    updateNewPostText(newText) {
        this._state.profilePage.newPostText = newText;
        this._callSubscriber(this._state);
    },
    addMessage() {
        let newMessage = {
            id: 6,
            message: this._state.dialogsPage.newMessageText
        };
        this._state.dialogsPage.messages.push(newMessage);
        this._state.dialogsPage.newMessageText = '';
        this._callSubscriber(this._state);
    },
    updateNewMessageText(newText) {
        this._state.dialogsPage.newMessageText = newText;
        this._callSubscriber(this._state);
    },
    dispatch(action) { // { type: 'ADD-POST' }
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.navBar = navbarReducer(this._state.navBar, action);
        this._callSubscriber(this._state);

        // if (action.type === ADD_POST) {
        //     let newPost = {
        //         id: 5,
        //         message: this._state.profilePage.newPostText,
        //         likesCount: 0
        //     };
        //     this._state.profilePage.posts.push(newPost);
        //     this._state.profilePage.newPostText = '';
        //     this._callSubscriber(this._state);
        // } else if (action.type === UPDATE_NEW_POST_TEXT) {
        //     this._state.profilePage.newPostText = action.newText;
        //     this._callSubscriber(this._state);
        // }
    
        // else if (action.type === ADD_MESSAGE) {
        //     let newMessage = {
        //         id: 6,
        //         message: this._state.dialogsPage.newMessageText
        //     };
        //     this._state.dialogsPage.messages.push(newMessage);
        //     this._state.dialogsPage.newMessageText = '';
        //     this._callSubscriber(this._state);
        // }
        // else if (action.type === UPDATE_NEW_MESSAGE_TEXT) {
        //     this._state.dialogsPage.newMessageText = action.newText;
        //     this._callSubscriber(this._state);
        // }

    }

}
export const addPostActionCreator = () => ({type: ADD_POST});

export const updateNewPostTextActionCreator = (text) => 
({type: UPDATE_NEW_POST_TEXT, newText: text});

export const addMessageActionCreator = () => ({ type: ADD_MESSAGE });
export const updateNewMessageTextActionCreator = (text) => {

    return {
        type: UPDATE_NEW_MESSAGE_TEXT,
        newText: text
    }
}

// let rerenderEntireTree = () => {
//     console.log('State changed');
// }

// let state = {
//     profilePage: {
//         posts: [
//             { id: 1, message: 'Hi, how you?', likesCount: 12 },
//             { id: 2, message: 'It\'s my first post', likesCount: 11 },
//             { id: 3, message: 'Blalbla', likesCount: 11 },
//             { id: 4, message: 'Dada', likesCount: 11 }
//         ],
//         newPostText: 'it-kamasutra.com'
//     },
//     dialogsPage: {

//         dialogs: [
//             { id: 1, name: 'Dimych' },
//             { id: 2, name: 'Andrey' },
//             { id: 3, name: 'Sveta' },
//             { id: 4, name: 'Sasha' },
//             { id: 5, name: 'Viktor' },
//             { id: 6, name: 'Valera' }
//         ],

//         messages: [
//             { id: 1, message: 'Hi' },
//             { id: 2, message: 'How is your it-kamasutra' },
//             { id: 3, message: 'Yo' },
//             { id: 4, message: 'Yo' },
//             { id: 5, message: 'Yo' }
//         ],
//         newMessageText: 'Hello'
//     },

//     navBar: {
//         navbar: [
//             { to: '/profile', profile: 'Profile' },
//             { to: '/dialogs', profile: 'Messages' },
//             { to: '/news', profile: 'News' },
//             { to: '/music', profile: 'Music' },
//             { to: '/settings', profile: 'Settings' }
//         ],
//         friends: [
//             { title: 'Friends' },
//             { friendname: 'Andrew', avatarClassName: 1 },
//             { friendname: 'Sasha', avatarClassName: 2 },
//             { friendname: 'Sveta', avatarClassName: 3 }]

//     }

// };
// export const addPost = () => {
//     let newPost = {
//         id: 5,
//         message: state.profilePage.newPostText,
//         likesCount: 0
//     };
//     state.profilePage.posts.push(newPost);
//     state.profilePage.newPostText = '';
//     rerenderEntireTree(state);
// }
// export const updateNewPostText = (newText) => {
//     state.profilePage.newPostText = newText;
//     rerenderEntireTree(state);
// }

// export const addMessage = () => {
//     let newMessage = {
//         id: 6,
//         message: state.dialogsPage.newMessageText
//            };
//     state.dialogsPage.messages.push(newMessage);
//     state.dialogsPage.newMessageText = '';
//     rerenderEntireTree(state);
// }

// export const updateNewMessageText = (newText) => {
//     state.dialogsPage.newMessageText = newText;
//     rerenderEntireTree(state);
// }

// export const subscribe = (observer) => {
//  rerenderEntireTree = observer;
// }

//export default state
export default store;
window.store = store;