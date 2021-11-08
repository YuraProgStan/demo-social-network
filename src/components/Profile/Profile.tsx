import React from 'react';
import s from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import {ProfileType} from "../../types/types";
type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}
const Profile: React.FC<PropsType> = (props) => {

    // let posts = [
    //   { id: 1, message: 'Hi, how you?', likesCount: 12},
    //   { id: 2,  message: 'It\'s my first post', likesCount: 11 },
    //   { id: 3,  message: 'Blalbla', likesCount: 11 },
    //   { id: 4,  message: 'Dada', likesCount: 11 }

    // ];

    return (
        <div>
            <ProfileInfo savePhoto={props.savePhoto}
                         saveProfile={props.saveProfile}
                         isOwner={props.isOwner}
                         profile={props.profile}
                         status={props.status}
                         updateStatus={props.updateStatus}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;