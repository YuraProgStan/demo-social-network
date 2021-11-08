import React from 'react';
import Navbar from './Navbar';
import StoreContext from '../../StoreContext';
import { connect } from 'react-redux';
import {DispatchPropsType, MapPropsType} from "../Navbar/Navbar";
import {AppStateType} from "../../redux/redux-store";



// const NavbarContainer = () => {

 

//   return (
//     <StoreContext.Consumer>
//     {(store) => {
// let state=store.getState().navBar;
//   return <Navbar  navBar={state} />}
//     }
//      </StoreContext.Consumer>
//   )
// }


let mapStateToProps = (state: AppStateType): MapPropsType => {
  return{
    friends: state.navBar.friends,
    navbar: state.navBar.navbar
  }
}
let mapDispatchToProps = (dispatch:any) => {
  return{
  }
}
const NavbarContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(Navbar)
export default NavbarContainer