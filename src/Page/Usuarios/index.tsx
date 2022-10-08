import React from 'react';
import ReactDOM from 'react-dom/client';
import Button from '../../components/Buttons';
import Search from './Search/index';
import Style from './usuarios.module.scss';
import { Link, Outlet } from "react-router-dom";


function Usuario() {
    return (
        <section>
            <Link to="/userCreate" className={Style.button + " Link"}>
                <Button name='Criar um novo usuário' onClick='' classes='' type='button' />
            </Link>
            <Search type='o usuário' />
            <Outlet />
        </section>
    )
}

export default Usuario;