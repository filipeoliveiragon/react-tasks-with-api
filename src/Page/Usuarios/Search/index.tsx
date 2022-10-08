import React, { createContext, useEffect, useState } from "react";

import Style from './search.module.scss';

import ButtonComponent from "../../../components/Buttons";
import { useLocation } from "react-router";
import { httpHome } from "../../../http";
import CardUser from '../CardsUser/index'

interface Props {
    type: 'o usuário' | 'a atividade';
}

interface Usuarios {
    id: number;
    nome: string;
    email: string;
    telefone: string;
}
export default function Search(props: Props) {

    const [nome, setNome] = useState('');
    const [users, setUsers] = useState<Usuarios[]>([])
    const location = useLocation();

    useEffect(() => {
        if (nome === '') {
            httpHome
                .get('user/')
                .then((res) => setUsers(res.data))
        }
    }, [])


    const formSubmit = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        let url = `user/busca/${nome}`;

        if (nome === '') url = 'user/';

        httpHome
            .get(url)
            .then((res) => {
                if (res.data == '') alert("Nada encontrado")
                else setUsers(res.data)
            })
    }

    return (
        <div className={Style.section}>
            <form className={Style.form} onSubmit={formSubmit}>
                <div className={Style.inputGroup}>
                    <input
                        className={Style.input}
                        type="text"
                        name="nome"
                        value={nome}
                        maxLength={35}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder={`Digite o nome d${props.type}`}
                    />
                </div>
                <ButtonComponent name="Buscar" type="submit"></ButtonComponent>
            </form>
            <div className={Style.list}>
                {
                    users.length > 0 ? 
                users?.map((users) => (
                    <CardUser id={users.id} email={users.email} nome={users.nome} telefone={users.telefone} />
                ))
                : <h1>Nenhum dado encontrado</h1>
            
            }
            </div>
        </div>
    )
}