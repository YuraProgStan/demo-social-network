import {InferActionsTypes} from "./redux-store";

// const ADD_MESSAGE = 'SN/DIALOGS/SEND-MESSAGE';
// const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';
type DialosType = {
    id: number,
    name: string
}
type MessagesType = {
    id: number,
    message: string
}
let initialState = {
    dialogs: [
        { id: 1, name: 'Dimych' },
        { id: 2, name: 'Andrew' },
        { id: 3, name: 'Sveta' },
        { id: 4, name: 'Sasha' },
        { id: 5, name: 'Viktor' },
        { id: 6, name: 'Valera' }
    ]  as Array<DialosType>,
    messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'How is your it-kamasutra?' },
        { id: 3, message: 'Yo' },
        { id: 4, message: 'Yo' },
        { id: 5, message: 'Yo' }
    ] as Array<MessagesType>

}



const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {

switch (action.type) {
    case 'SN/DIALOGS/SEND-MESSAGE':
        let body = action.newMessageBody;
        return {
            ...state,
            messages: [...state.messages, {id: 6, message: body}]
        };
        
        //stateCopy.messages = [...state.messages];
       // stateCopy.messages.push(newMessage);
       // stateCopy.newMessageBody = '';
        //return stateCopy;

    // case UPDATE_NEW_MESSAGE_TEXT:
    //     return  {
    //         ...state,
    //         newMessageBody: action.newText
    //
    //     };
       // stateCopy.newMessageText = action.newText;
       // return stateCopy;

    default: return state;
}
}
// type AddMessageActionCreatorType = {
//     type: typeof ADD_MESSAGE
//     newMessageBody: string
// }
// export const addMessageActionCreator = (newMessageBody: string): AddMessageActionCreatorType => ({ type: ADD_MESSAGE, newMessageBody });
// export const updateNewMessageTextActionCreator = (text) => {
//
//     return {
//         type: UPDATE_NEW_MESSAGE_TEXT,
//         newText: text
//     }
// }
export default dialogsReducer;
export const actions = {
    sendMessage: (newMessageBody: string) => ({ type: 'SN/DIALOGS/SEND-MESSAGE', newMessageBody } as const)
}
export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>