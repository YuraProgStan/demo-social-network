import React, {FC} from 'react';
import styles from "./users.module.css";
import userPhoto from "../../assets/images/user.png";
import * as axios from "axios";
//import {toggleFollowingProgress} from "../../redux/users-reducer";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UserType} from "../../types/types";
import {usersAPI} from "../../api/users-api";

// let Users = (props) => {
//
//     let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
//
//     let pages = [];
//     for (let i = 1; i <= pagesCount; i++) {
//         pages.push(i);
//     }
//
//
//     return <div>
//           <Paginator currentPage = {props.currentPage} onPageChanged = {props.onPageChanged}
//                    totalUsersCount = {props.totalUsersCount} pageSize = {props.pageSize}  />
//         {
//            props.users.map(u => <div key={u.id}>
//                 <span>
//                     <div>
//                        <NavLink to={'/profile/' + u.id}>
//                         <img src={u.photos.small != null ? u.photos.small : userPhoto}
//                              className={styles.userPhoto}/>
//                        </NavLink>
//                     </div>
//                     <div>
//                         {u.followed
//                             ? <button disabled={props.followingInProgress.some(id => id === u.id)}
//                             onClick={() => {props.unfollow(u.id);}}>
//                                 Unfollow</button>
//                             : <button disabled={props.followingInProgress.some(id => id === u.id)}
//                             onClick={() => {props.follow(u.id);}}>
//                                 Follow</button>}
//
//                     </div>
//                 </span>
//                 <span>
//                     <span>
//                         <div>{u.name}</div>
//                         <div>{u.status}</div>
//                     </span>
//                     <span>
//                         <div>{"u.location.country"}</div>
//                         <div>{"u.location.city"}</div>
//                     </span>
//                 </span>
//             </div>)
//         }
//     </div>
// }
type PropsType = {
    currentPage: number
    totalUsersCount: number
    pageSize: number
    onPageChanged: (pageNumber:number) => void
    users: Array<UserType>
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

let Users: FC<PropsType> = ({currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props}) => {

       return <div>

        <Paginator  currentPage={currentPage} onPageChanged={onPageChanged}
                   totalItemsCount={totalUsersCount} pageSize={pageSize}/>
        <div>
            {
                users.map(u => <User user={u}
                                     followingInProgress={props.followingInProgress}
                                     key={u.id}
                                     unfollow={props.unfollow}
                                     follow={props.follow}
                    />
                )
            }
        </div>
    </div>
}
export default Users;