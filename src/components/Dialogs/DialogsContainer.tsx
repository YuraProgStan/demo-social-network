import React from 'react';
import {actions} from "../../redux/dialogs-reducer";
import Dialogs from './Dialogs';
import {connect} from "react-redux";
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';
import {AppStateType} from "../../redux/redux-store";


// const DialogsContainer = () => {



//     return <StoreContext.Consumer> 
//         { (store) =>{
//             let state = store.getState().dialogsPage;

//             let onSendMessageClick = () => {
//                 store.dispatch(addMessageActionCreator());
//             }
//             let onMessageChange = (text) => {
//                 store.dispatch(updateNewMessageTextActionCreator(text));
//             }

//        return <Dialogs updateNewMessageTextActionCreator={onMessageChange} 
//        addMessage={onSendMessageClick}
//         dialogsPage={state} />}
//     } 
//         </StoreContext.Consumer>
// }

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage
    }
};
// let mapDispatchToProps = (dispatch) => {
//     return {
//
//         addMessage: (newMessageBody) => {
//             dispatch(actions.addMessage(newMessageBody));
//         }
//     }
//
// };

// let AuthRedirectComponent =  withAuthRedirect(Dialogs);
// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);

export default compose<React.ComponentType>(
    connect(mapStateToProps,{...actions}),
    withAuthRedirect
)(Dialogs);