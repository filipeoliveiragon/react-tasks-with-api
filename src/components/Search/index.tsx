import React, { useState } from "react";
import '../../styles/global_styles.scss'

import Style from './search.module.scss';

import ButtonComponent from "../Buttons";
import { useLocation } from "react-router";
import { httpHome } from "../../http";

interface Props{
    type: 'o usuário' | 'a atividade';
}

export default function Search(props: Props) {

    const [nome, setNome] = useState('');
    const location = useLocation();


    const formSubmit = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        let url = location.pathname === '/' ? 'user' : location.pathname;

        url += `/busca/${nome}`;

        httpHome
            .get(url)
            .then((res) => console.log(res))
    }

    return (
        <form className={Style.form} onSubmit={formSubmit}>
            <div className={Style.inputGroup}>
                <input
                    className={Style.input}
                    type="text"
                    name="nome"
                    value={nome}
                    required
                    onChange={(e) => setNome(e.target.value)}
                    placeholder={`Digite o nome d${props.type}`}
                />
            </div>
            <ButtonComponent name="Buscar" type="submit"></ButtonComponent>
        </form>
    )
}