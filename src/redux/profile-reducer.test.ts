import profileReducer, {actions} from "./profile-reducer";


let state = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11},
        {id: 3, message: 'Blabla', likesCount: 11},
        {id: 4, message: 'Dada', likesCount: 11}
    ],
    profile: null,
    status: "",
    newPostText: ""
};
//I test
it('length of posts should be incremented', () => {
//1. start test data
    let action = actions.addPostActionCreator('it-kamasutra.com');

//2. action
    let newState = profileReducer(state, action);
//3.expectation
    expect(newState.posts.length).toBe(5);

})
//II test
it('message of new posts should be correct', () => {
//1. start test data
    let action = actions.addPostActionCreator('it-kamasutra.com');

//2. action
    let newState = profileReducer(state, action);
//3.expectation
    expect(newState.posts[4].message).toBe('it-kamasutra.com')
})
//III test
it('after deleting length of messages should be decrement', () => {
//1. start test data
    let action = actions.deletePost(1);

//2. action
    let newState = profileReducer(state, action);
//3.expectation
    expect(newState.posts.length).toBe(3)
})

//IV test
it('after deleting length shouldn`t be decrement if id is incorect', () => {
//1. start test data
    let action = actions.deletePost(1000);

//2. action
    let newState = profileReducer(state, action);
//3.expectation
    expect(newState.posts.length).toBe(4)
})