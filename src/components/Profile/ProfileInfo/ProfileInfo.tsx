import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileType} from "../../../redux/profile-reducer";
import {ProfileStatus} from "./ProfileStatus";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";

type ProfileInfo = {
    profile: null | ProfileType
    status: string
    updateStatus: (status: string) => void
}

export const ProfileInfo = (props: ProfileInfo) => {

    if (!props.profile) {
        return <Preloader/>
    }
    return (<div>
        {/*<div>*/}
        {/*    <img src='https://union-travel.ru/assets/images/country/thailand/resorts/beach1.jpg'></img>*/}
        {/*</div>*/}
        <div>
            <img src={props.profile.photos.large}/>
            <br/>Name: {props.profile.fullName}
            <br/>About me: {props.profile.aboutMe}
            <br/>Contacts: {props.profile.contacts.vk}
            <br/>Looking for a job? {props.profile.lookingForAJob ? 'Yes' : 'No'}
            <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
        </div>
    </div>)
}
