import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './Navbar.module.css';
import {AppStateType} from "../../redux/redux-store";
import {FriendType, NavbarType} from "../../redux/navbar-reducer";
//s ={
// 'nav': 'Navbar_nav__3ou9Q',
//'item': 'Navabar_item__3qaF3',
//'active': 'Navabar_active__3qhhh'
//}
let c1 = "item";
let c2 = "active";
//"item active"
let classes = c1 + " " + c2;
let classesNew = `${s.item} ${s.active}`;

export type MapPropsType = {
    friends: Array<FriendType>
    navbar: Array<NavbarType>
    }
export type DispatchPropsType = {
}

const Navbar: React.FC<MapPropsType & DispatchPropsType> = (props) => {

 

  let friendsAll = props.friends.map((f,index) =>(index!==0)?<div className={s.friend}>
    <div className={`${s.avatar} ${s.avatar}${f.avatarClassName}`}></div>
    <div className={s.friendName}><span>{f.friendName}</span></div></div>
    :"");
   let {title:friendsTitle}=props.friends[0];
 
 //let friendsTag = `<h3>${friendsTitle}</h3>`;
  let navLinks = props.navbar.map(n => <div className={s.item}><NavLink to={n.to} activeClassName={s.activeLink}>{n.profile}</NavLink></div>);

  return (


    <nav className={s.nav}>
      {navLinks}
<div className={s.friends}>

<h3>{friendsTitle}</h3> 
      {friendsAll}

      </div> 
    </nav>


    // <nav className={s.nav}>
    //   <div className={s.item}>
    //     <NavLink to="/profile" activeClassName={s.activeLink}>Profile</NavLink>
    //   </div>
    //   <div className={`${s.item} ${s.active}`}>
    //     <NavLink to="/dialogs"activeClassName={s.activeLink}>Messages</NavLink>
    //   </div>
    //   <div className={s.item}>
    //     <NavLink to="/news" activeClassName={s.activeLink}>News</NavLink>
    //   </div>
    //   <div className={s.item}>
    //     <NavLink to="/music" activeClassName={s.activeLink}>Music</NavLink>
    //   </div>
    //   <div className={s.item}>
    //     <NavLink to="/settings" activeClassName={s.activeLink}>Settings</NavLink>
    //   </div>
    // </nav>

  )
}
export default Navbar