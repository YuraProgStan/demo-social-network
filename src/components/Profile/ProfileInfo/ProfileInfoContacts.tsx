import React from 'react';
import {ContactsType} from "../../../types/types";
type PropsType = {
  contacts: ContactsType
}

const ProfileInfoContacts: React.FC<PropsType> = (props) => {
  
 
  return (
    <div>{props.contacts}</div>
  )
}

export default ProfileInfoContacts;