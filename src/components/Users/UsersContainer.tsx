import React from 'react';
import { connect } from 'react-redux';
import Users from './Users';
import { follow, 
   unfollow, 

   requestUsers } from '../../redux/users-reducer';
import Preloader from '../common/Preloader/Preloader';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';
import {getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from '../../redux/users-selectors'
import {UserType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";
type MapStatePropsType = {
   currentPage: number
   pageSize: number
   isFetching: boolean
   totalUsersCount: number
   users: Array<UserType>
   followingInProgress: Array<number>
   }
type MapDispatchPropsType = {
   unfollow: (userId: number) => void
   follow: (userId: number) => void
   getUsers: (currentPage: number, pageSize: number) => void
   // toggleFollowingProgress:(isFetching: boolean, userId: number) => void
   }
type OwnPropsType = {
   pageTitle: string
}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType
class UsersContainer extends React.Component<PropsType> {

   componentDidMount() {
      const {currentPage, pageSize} = this.props;
      this.props.getUsers(currentPage, pageSize);
   }

   onPageChanged = (pageNumber: number) => {
      const {pageSize} = this.props;
      this.props.getUsers(pageNumber, pageSize);

       }

   render() {

      return <>
         <h2>{this.props.pageTitle}</h2>
         {this.props.isFetching ? <Preloader /> : null}
         <Users totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            onPageChanged={this.onPageChanged}
            users={this.props.users}
            follow={this.props.follow}
            unfollow={this.props.unfollow}
            
         
            followingInProgress = {this.props.followingInProgress}

         />
      </>
   }

}
let mapStateToProps = (state: AppStateType): MapStatePropsType => {
   return {
      users: getUsers(state),
      pageSize: getPageSize(state),
      totalUsersCount: getTotalUsersCount(state),
      currentPage: getCurrentPage(state),
      isFetching: getIsFetching(state),
      followingInProgress: getFollowingInProgress(state)
   }
}
// let mapStateToProps = (state) => {
//    return {
//       users: state.usersPage.users,
//       pageSize: state.usersPage.pageSize,
//       totalUsersCount: state.usersPage.totalUsersCount,
//       currentPage: state.usersPage.currentPage,
//       isFetching: state.usersPage.isFetching,
//       followingInProgress: state.usersPage.followingInProgress

//    }
// }


// let mapDispatchToProps = (dispatch) => {
//    return {
//       follow: (userId) => {
//          dispatch(followAC(userId))
//       },
//       unfollow: (userId) => {
//          dispatch(unfollowAC(userId))
//       },
//       setUsers: (users) => {
//          dispatch(setUsersAC(users))
//       },
//       setCurrentPage: (pageNumber) => {
//          dispatch(setCurrentPageAC(pageNumber))
//       },
//       setTotalUsersCount: (totalCount) => {
//          dispatch(setUsersTotalCountAC(totalCount))
//       },
//       toggleIsFetching: (isFetching) => {
//          dispatch(toggleIsFetchingAC(isFetching))
//       }
//    }



//export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
// export default withAuthRedirect(connect(mapStateToProps, {
//    follow, unfollow,  
//    toggleFollowingProgress, getUsers  //getUsers - это callback, а также Thunk Creator
//    })(UsersContainer));

export default compose(
 //  withAuthRedirect,
    //TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState
   connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps,
       {
      follow, unfollow,
      /*toggleFollowingProgress,*/ getUsers: requestUsers  //getUsers - это callback, а также Thunk Creator
      })
      )(UsersContainer)