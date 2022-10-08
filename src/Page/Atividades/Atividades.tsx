import React, { createContext, useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import Button from '../../components/Buttons';
import Search from './Search';
import Style from './atividades.module.scss';


function Atividades() {
    return (
        <section>
            <Link to="novaAtividade/" className={Style.button + " Link"}>
                <Button name='Criar nova Atividade' onClick='' classes='' type='button' />
            </Link>
            <Search type='a atividade' />
            <Outlet />
        </section>
    )
}

export default Atividades;