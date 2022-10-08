import React, { useEffect, useState } from "react";
import Style from './create.module.scss';
import { Method } from 'axios';

import ButtonComponent from "../../../components/Buttons";
import Input from "../../../components/Inputs/index";
import { Link, useNavigate, useParams } from "react-router-dom";
import Return from '../../../assets/rr.svg';
import { httpHome } from "../../../http";
import MaskInput from 'react-maskinput';

interface Props {
    titulo: string;
}

interface Usuario {
    nome: string;
    email: string;
    telefone: string;
}


export default function UserCreate(props: Props) {

    const navigate = useNavigate();

    const parametros = useParams();

    let user: Usuario = {
        nome: '',
        email: '',
        telefone: ''
    }

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');

    const [submitValid, setSubmit] = useState<boolean>(false);


    useEffect(() => {
        if (parametros.id) {
            httpHome
                .get(`user/${parametros.id}`)
                .then((res) => {
                    setNome(res.data.nome)
                    setEmail(res.data.email)
                    setTelefone(res.data.telefone)
                })
                .catch((error) => console.log(error))
        }
    }, [])

    useEffect(() => {
        if (nome === '' || email === '' || telefone === '') {
            setSubmit(true)
            return;
        }
        setSubmit(false);
    }, [nome, email, telefone])

    const formSubmit = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        let url = 'user/';
        let method: Method = 'POST';

        if (parametros.id) {
            method = 'PATCH';
            url += `${parametros.id}/`;
        }

        const formData: Usuario = {
            nome,
            email,
            telefone
        }

        httpHome
            .request({
                url,
                method,
                headers: {
                    'Content-type': `application/json`
                },
                data: formData
            })
            .then(() => {
                navigate(-1);
            })
            .catch((error) => console.log(error))
    }

    return (
        <div className={Style.body}>
            <button onClick={() => navigate(-1)} className={Style.return}>
                <img src={Return} alt="" />
            </button>
            <form className={Style.form} onSubmit={formSubmit}>
                <h1>{props.titulo} Usuário</h1>
                <div className={Style.inputGroup}>
                    <label>Nome do usuário</label>
                    <input
                        className={Style.input}
                        type="text"
                        name="nome"
                        placeholder="Digite o nome completo"
                        maxLength={50}
                        value={nome}
                        required
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>
                <div className={Style.inputGroup}>
                    <label>E-mail</label>
                    <input
                        className={Style.input}
                        type="text"
                        name="email"
                        placeholder="Digite seu e-mail"
                        value={email}
                        maxLength={50}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className={Style.inputGroup}>
                    <label>Telefone</label>
                    <input
                        className={Style.input}
                        type="text"
                        pattern="[0-9]*"
                        maxLength={11}
                        name="telefone"
                        placeholder="Digite o número de telefone"
                        value={telefone}
                        required
                        onChange={(e) => setTelefone(e.target.validity.valid ? e.target.value : '')
                        }
                    />
                </div>
                <button className={Style.btn} type="submit" disabled={submitValid}> Confirmar </button>
            </form>
        </div>
    )
}