import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { reduxForm} from 'redux-form';
import AddMessageForm from './AddMessageForm/AddMessageForm';
import {InitialStateType} from "../../redux/dialogs-reducer";

type PropsType = {
    dialogsPage: InitialStateType
    sendMessage: (messageText: string) => void
    }
export type NewMessageFormValuesType = {
    newMessageBody: string
   }


const Dialogs: React.FC<PropsType> = (props) => {
    let state = props.dialogsPage;
    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id} />);
    let messagesElements = state.messages.map(m => <Message message={m.message} key={m.id} />);
    // let newMessageBody = state.newMessageBody;

    //let newAddElement = React.createRef();
    // let onSendMessageClick = () => {
       
    //     props.addMessage();
      
    // }
    // let onMessageChange = (e) => {
    //     let text = e.target.value;
        
    //     props.updateNewMessageTextActionCreator(text);
    // }
    let addNewMessage = (values: NewMessageFormValuesType) => {
         props.sendMessage(values.newMessageBody)
    }
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
                {/* <DialogItem name={dialogsData[0].name} id={dialogsData[0].id} />
                <DialogItem name={dialogsData[1].name} id={dialogsData[1].id} /> */}
                {/* <DialogItem name="Sveta" id="3" /> */}

                {/* <div className={s.dialog}>
                <NavLink to="/dialogs/2">Andrey</NavLink>
                </div> */}

            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <AddMessageForm onSubmit = {addNewMessage} />
            </div>
        </div>
    )
}

export default Dialogs;