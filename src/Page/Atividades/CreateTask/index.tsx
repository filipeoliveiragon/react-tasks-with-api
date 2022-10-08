import React, { useEffect, useState } from "react";
import Style from './task.module.scss';
import { Link, useNavigate, useParams } from "react-router-dom";
import { httpHome } from "../../../http";
import ButtonComponent from "../../../components/Buttons";
import { Method } from "axios";
import { getValue, isDisabled } from "@testing-library/user-event/dist/utils";
import { refreshPage } from "../Search";

interface Usuarios {
    id: number;
    nome: string;
}

interface Atividade {
    id?: number;
    nome: string;
    id_user?: number;
}

function ModalCreate() {

    const params = useParams();
    const navigate = useNavigate();

    let type = params.id ? "Editar" : "Criar";

    const [nome, setNome] = useState('');
    const [id_user, setIdUser] = useState('');
    const [usuarios, setUsuario] = useState<Usuarios[]>([]);

    const [submitValid, setSubmit] = useState<boolean>(false);

    useEffect(() => {
        if (params.id) {
            httpHome
                .get(`atividade/${params.id}`)
                .then((res) => {
                    setNome(res.data.nome);
                    setIdUser(res.data.id_user);
                })
                .catch((error) => console.log(error));
        }
        httpHome
            .get('user/')
            .then((res) => setUsuario(res.data))
    }, []);

    useEffect(() => {
        console.log(nome + "  <->   " + id_user);
        if (nome === '' || id_user === '-1') {
            setSubmit(true)
            return;
        }
        setSubmit(false);
    }, [nome, id_user])


    const formSubmit = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        let url = 'atividade/';
        let method: Method = 'POST';

        if (params.id) {
            method = 'PATCH';
            url += `${params.id}/`;
        }

        const dados = {
            nome,
            id_user
        };

        httpHome
            .request({
                url,
                method,
                headers: {
                    'Content-type': `application/json`
                },
                data: dados
            })
            .then(() => {
                navigate('/atividade');
                refreshPage();
            })
            .catch((error) => console.log(error))
    }

    return (
        <div className={Style.modal}>
            <button onClick={() => { navigate('/atividade') }} className={Style.close}></button>
            <form className={Style.modal__body} onSubmit={formSubmit}>
                <h1>{type} Atividade</h1>
                <div className={Style.inputGroup}>
                    <label>Atividade</label>
                    <input
                        className={Style.input}
                        type="text"
                        name="nome"
                        value={nome}
                        maxLength={50}
                        required
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Digite o nome da atividade desenvolvida"
                    />
                </div>
                <div className={Style.inputGroup}>
                    <label>Nome do usuário</label>
                    <select className={Style.input} value={id_user} onChange={(e) => setIdUser(e.target.value)}>
                        <option value={'-1'}>Selecione o usuário</option>
                        {usuarios?.map((usuarios) => (
                            <option value={usuarios.id} key={usuarios.id}>{usuarios.nome}</option>
                        ))}
                    </select>
                </div>
                <button className={Style.btn} type="submit" disabled={submitValid}> Confirmar </button>
            </form>
        </div >
    )
}

export default ModalCreate;