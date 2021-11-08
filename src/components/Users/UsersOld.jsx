import React from "react";
import styles from './users.module.css';
import * as axios from 'axios';
import userPhoto from '../../assets/images/user.png'

let Users = (props) => {

    let getUsers = () => {
        if (props.users.length === 0) {
            axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
                props.setUsers(response.data.items);
            });

            // props.setUsers( [
            //     { id: 1, photoUrl: 'https://instagram-star.com/uploads/posts/2020-07/medium/1595793402_nagiev.jpg',
            //      followed: false, fullName: 'Dmitriy', status: 'I am a boss', location: {city: 'Minsk', country: 'Belarus'} },
            //     { id: 2, photoUrl:'https://instagram-star.com/uploads/posts/2020-07/medium/1595793402_nagiev.jpg',
            //         followed: true, fullName: 'Sasha', status: 'I am a boss too', location: {city: 'Moskow', country: 'Russsia'} },
            //     { id: 3, photoUrl: 'https://instagram-star.com/uploads/posts/2020-07/medium/1595793402_nagiev.jpg',
            //      followed: false, fullName: 'Andrew', status: 'I am a boss too', location: {city: 'Kiev', country: 'Ukraine'} }

            // ]);
        }
    }
    return <div>
        <button onClick={getUsers}>Get Users</button>
        {
            props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <img src={u.photos.small !== null ? u.phostos.small : userPhoto} className={styles.userPhoto} />
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => { props.unfollow(u.id) }}>UnFollow</button>
                            : <button onClick={() => { props.follow(u.id) }}>Follow</button>
                        }
                    </div>

                </span>
                <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{"u.location.country"}</div>
                        <div>{"u.location.city"}</div>
                    </span>
                </span>
            </div>)
        }
    </div>
}

export default Users;