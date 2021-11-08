import React, {ChangeEvent, useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import LookingJob from '../../../assets/images/looking_job.png';
import FindJob from '../../../assets/images/found_job.png';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from "../../../assets/images/user.png";
import ProfileDataForm from "./ProfileDataForm";
import {ContactsType, ProfileType} from "../../../types/types";

type PropsType = {
  profile: ProfileType | null
  status: string
  updateStatus: (status: string) => void
  isOwner: boolean
  savePhoto: (file: File) => void
  saveProfile: (profile: ProfileType) => Promise<any>
}
const ProfileInfo: React.FC<PropsType> = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {
  let [editMode, setEditMode] = useState(false);

  if (!profile) {
    return <Preloader />
  }
  const onMainPhotoSelected = (e:ChangeEvent<HTMLInputElement>) => {
if (e.target.files && e.target.files.length){
  savePhoto(e.target.files[0])
}
  }
  const onSubmit = (formData: ProfileType) => {
    // todo: remove then
  saveProfile(formData).then(
      () =>{
      setEditMode(false);
    });

  }
  // let contacts = profile.contacts;
  // const values = Object.values(contacts);
  // let contactsArr = values.map(p =><ProfileInfoContacts contacts={p} />);

  return (
    <div>
      {/* <div>
        <img src='https://markotour.com.ua/images/2021/04/02/dominikana1.jpg' />
      </div> */}
      <div className={s.descriptionBlock}>
        <img src = {profile.photos.large||userPhoto} className={s.mainPhoto} />
        {isOwner && <input type = {"file"} onChange = {onMainPhotoSelected} />}

        <div>{profile.aboutMe}</div>
        {/*<div>{contactsArr}</div>*/}
        {editMode
            ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
            : <ProfileData goToEditMode={()=>{setEditMode(true)}} profile={profile} isOwner={isOwner} />}

         <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      </div>

    </div>
  )
}
type ProfileDataPropsType = {
  profile: ProfileType
  isOwner: boolean
  goToEditMode: () => void
}
const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode}) =>{
return <div>
  {isOwner && <div><button onClick={goToEditMode}>edit</button></div>}
  <div><b>Full name</b>: {profile.fullName}</div>

  <div><img className={s.lookingJob} src={profile.lookingForAJob?LookingJob:FindJob} /></div>
  <div>
    <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}
  </div>
  {profile.lookingForAJob &&
  <div>
    <b>My professional skills</b>: {profile.lookingForAJobDescription}
  </div>
  }
  <div>
    <b>About me</b>: {profile.aboutMe}
  </div>
  <div>
    <b>Contacts</b>: {Object
      .keys(profile.contacts)
      .map(key => {
    return <Contact key={key} contactTitle = {key} contactValue = {profile.contacts[key as keyof ContactsType]} />
  })
  }
  </div>
</div>
}
type ContactsPropsType = {
  contactTitle: string
  contactValue: string
}
const Contact: React.FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo;