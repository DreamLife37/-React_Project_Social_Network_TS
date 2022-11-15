import React from "react";
import s from "./Users.module.css";
import {UserType} from "../../redux/users-reducer";
import {UserItem} from "./UserItem/UserItem";
import {Paginator} from "../common/Paginator/Paginator";

type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    users: Array<UserType>
    followingInProgress: Array<number>
    unFollow: (userId: number) => void
    follow: (userId: number) => void
    onPageChanged: (page: number) => void
}

export const Users = (props: UsersPropsType) => {
    return <div>
        <Paginator followingInProgress={props.followingInProgress}
                   unFollow={props.unFollow}
                   follow={props.follow}
                   onPageChanged={props.onPageChanged}
                   pageSize={props.pageSize}
                   currentPage={props.currentPage}
                   totalUsersCount={props.totalUsersCount}
                   portionSize={20}/>
        <div className={s.usersItems}>
            <UserItem users={props.users}
                      follow={props.follow}
                      unFollow={props.unFollow}
                      followingInProgress={props.followingInProgress}
            /></div>
    </div>
}

