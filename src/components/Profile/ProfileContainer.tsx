import React from 'react';
import {connect} from 'react-redux';
import Profile from './Profile';
import {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile} from '../../redux/profile-reducer';
import {withRouter} from 'react-router';
import {compose} from 'redux';
import {AppStateType} from "../../redux/redux-store";
import {RouteComponentProps} from "react-router-dom";
import {ProfileType} from "../../types/types";

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (text: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}
type PathParamsType = {
    userId: string
}


type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>;

class ProfileContainer extends React.Component <PropsType> {
    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                // todo: may be replace push with Redirect??
                this.props.history.push("/login")
            }
        }
        if (!userId) {
            console.error("ID should exists in URI params or in state ('authorizedUserId')");
        } else {
            this.props.getUserProfile(userId);
            this.props.getStatus(userId);
        }
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {

        return (

            <Profile {...this.props} /*props={this.props}*/
                     savePhoto={this.props.savePhoto}
                     isOwner={!this.props.match.params.userId}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
                     saveProfile={this.props.saveProfile}


            />
        )
    }
}

let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
});

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter
    //,withAuthRedirect
)(ProfileContainer);

// let AuthRedirectComponent =  withAuthRedirect(ProfileContainer);


// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);
// export default connect (mapStateToProps, {getUserProfile}) (WithUrlDataContainerComponent); //получает данные от Store и получает Callback от Store