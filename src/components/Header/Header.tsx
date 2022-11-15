import React from "react";
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import {HeaderPropsType} from "./HeaderContainer";
import userAvatarDefault from './../../assets/images/user.png'
import {Search} from "./Search/Search";
import {SvgSelector} from "../common/Utils/svgSelector";

export const Header = (props: HeaderPropsType) => {

    return <header className={s.header}>
        <div className={s.logo}><NavLink to={'/profile'} className={s.link}>Social network
            <div>by DevAndreyIT</div></NavLink>
        </div>
        <div className={s.search}><Search/></div>
        <div className={s.loginBlock}>
            {props.isAuth
                &&
                <><NavLink to={'/profileSettings'}>
                    <span className={s.icons}> <SvgSelector
                        id={'settings'}/></span>
                </NavLink>
                    <span className={s.icons} onClick={props.logout}> <SvgSelector id={'logout'}/></span> </>
            }
            {props.isAuth
                ? <img className={s.userAvatar} src={props.photo || userAvatarDefault}/>
                : <NavLink to={'/login'}><span className={s.icons}> <SvgSelector
                    id={'login'}/></span></NavLink>}
        </div>
    </header>
}