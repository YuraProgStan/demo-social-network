export type NavbarType = {
    to: string
    profile: string
}
export type FriendType = {
    title?: string
    friendName?: string
    avatarClassName?: number
}
let initialState = {
    navbar: [
    { to: '/profile', profile: 'Profile' },
    { to: '/dialogs', profile: 'Messages' },
    { to: '/users', profile: 'Users' },
    { to: '/news', profile: 'News' },
    { to: '/music', profile: 'Music' },
    { to: '/settings', profile: 'Settings' }
] as Array<NavbarType>,
friends: [
    { title: 'Friends' },
    { friendName: 'Andrew', avatarClassName: 1 },
    { friendName: 'Sasha', avatarClassName: 2 },
    { friendName: 'Sveta', avatarClassName: 3 }] as Array<FriendType>
}
export type InitialStateType = typeof initialState
const navbarReducer = (state = initialState, action: any) =>{
    return state;
}

export default navbarReducer;