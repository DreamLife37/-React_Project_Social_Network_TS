import s from './Profile.module.css'
import React, {JSXElementConstructor} from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getUserProfile, ProfileType} from '../../redux/profile-reducer';
import {Navigate, useLocation, useNavigate, useParams} from "react-router-dom";


type MapStatePropsType = {
    profile: null | ProfileType
    isAuth: boolean
}

type MapDispatchPropsType = {
    getUserProfile: (userId: number) => void
}

export type ProfilePropsType = MapStatePropsType & MapDispatchPropsType

export class ProfileContainer extends React.Component<ProfilePropsType> {
    componentDidMount() {
        // @ts-ignore
        let userId = this.props.router.params.userId;
        if (!userId) {
            userId = 2
        }
        this.props.getUserProfile(userId)
    }

    render() {
        if (!this.props.isAuth) return <Navigate to="/login"/>
        return <div className={s.content}>
            <Profile {...this.props} profile={this.props.profile}/>
        </div>
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth
})

//оболочка для классовой компонеты
export const withRouter = (Component: JSXElementConstructor<any>): JSXElementConstructor<any> => {
    function ComponentWithRouterProp(props: any) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{location, navigate, params}}
            />
        );
    }

    return ComponentWithRouterProp;
}

export const ProfileContainerToStore = connect(mapStateToProps, {
    getUserProfile
})(withRouter(ProfileContainer))