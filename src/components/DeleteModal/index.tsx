import React, { useState } from "react";
import Style from './delete.module.scss';
import DeleteIcon from '../../assets/alert.svg';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { httpHome } from "../../http";
import { refreshPage } from '../../Page/Atividades/Search/index';

interface Props {
    type: 'atv' | 'user';
    titulo: 'ATIVIDADE' | 'USUÁRIO';
    texto: 'atividade' | 'usuário';
    url: 'atividade/' | 'user/';
}

function ModalDelete(props: Props) {

    const navigate = useNavigate();
    const params = useParams();
    const location = props.url == 'atividade/' ? '/atividade' : '/';
    

    const DeleteId = () => {
        if (params.id?.match(",")) {
            let exemplo = params.id?.split(",");
            exemplo.forEach((id) => {
                let url = `${props.url}${id}`;

                httpHome
                    .delete(url)
            })

        } else {

            let url = `${props.url}${params.id}`;

            httpHome
                .delete(url)
        }
        navigate(`${location}`, {replace: true});
        refreshPage();
    }

    return (
        <div className={Style.modal} id="modal-delete">
            <div className={Style.modal__body}>
                <h1>DELETAR {props.titulo}</h1>
                <img src={DeleteIcon} alt="" />
                <p>Você está prestes a deletar uma {props.texto}, para continuar pressione o botão <b>DELETAR</b>.</p>
                <div className={Style.buttons}>
                    <button onClick={() => navigate(-1)} className={Style.btn}>CANCELAR</button>
                    <button className={Style.btn} type="button" onClick={DeleteId}>DELETAR</button>
                </div>
            </div>
        </div>
    )
}

export default ModalDelete;