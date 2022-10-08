import React from "react";
import Logo from './../../assets/logoArpia.png';
import Style from './header.module.scss';
import '../../styles/global_styles.scss'
import { Link, useLocation } from "react-router-dom";

function HeaderComponent() {

    const location = useLocation();

    return (
        <header className={Style.header}>
            <div className={Style.img}>
                <img className={Style.header__img} src={Logo} alt="" />
            </div>
            <div className={Style.links}>
                <Link to={'/'} className={location.pathname === '/' ? Style.header__link__active + ' ' + Style.header__link : Style.header__link}>
                    Usuários
                </Link>
                <Link to={'/atividade'} className={location.pathname === '/atividade' ? Style.header__link__active + ' ' + Style.header__link : Style.header__link}>
                    Atividades
                </Link>
            </div>
        </header>
    )
}

export default HeaderComponent;