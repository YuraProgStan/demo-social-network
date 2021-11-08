import React, {ChangeEvent, useEffect, useState} from 'react';

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}
const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);
    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);
//  let stateWithSetState =  useState(false); //массив
//  let editMode = stateWithSetState[0]; //1 элемент массива значение
//  let setEditMode = stateWithSetState[1]; //2 элемент массива - это функция, которая это значение устанавливает

    const activateEditMode = () => {
        setEditMode(true);
    }
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode &&
            <div>
                <span onDoubleClick={activateEditMode}>{props.status || "-------"}</span>
            </div>
            }
            {editMode &&
            <div>
                {/* <input autoFocus={true} onBlur={this.deactivateEditMode.bind(this)} value={this.props.status} /> */}
                <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status}/>
            </div>
            }
        </div>
    )
}


export default ProfileStatusWithHooks;

