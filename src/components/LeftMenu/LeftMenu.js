import React from 'react'
import { Link } from "react-router-dom";
import LogoWhite from "../../assets/png/logo-white.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faUser,
    faUsers,
    faPowerOff,
} from "@fortawesome/free-solid-svg-icons";

import "./LeftMenu.scss"
export default function LeftMenu() {
    return (
        <div className='left-menu'>
            <img className='logo' src={LogoWhite} alt="Twittor" />
            <Link to="/">
                <FontAwesomeIcon icon={faHome} />Inicio
            </Link>
            <Link to="/user">
                <FontAwesomeIcon icon={faUsers} />Usuarios
            </Link>
            <Link to="/profile">
                <FontAwesomeIcon icon={faUser} />Perfil
            </Link>

        </div>
    )
}
