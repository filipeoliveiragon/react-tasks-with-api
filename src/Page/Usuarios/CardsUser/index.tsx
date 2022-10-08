import React, { useEffect, useState } from "react";
import Style from './carduser.module.scss';
import '../../../styles/global_styles.scss';

import UserIcon from '../../../assets/user.svg';
import MailIcon from '../../../assets/mail.svg';
import PhoneIcon from '../../../assets/phone.svg';
import TasksIcon from '../../../assets/tasks.svg';
import DeleteIcon from '../../../assets/delete.svg'
import EditIcon from '../../../assets/edit.svg'

import { httpHome } from "../../../http";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Atividades from "../../Atividades/Atividades";
import ModalDelete from "../../../components/DeleteModal/index";

interface Usuarios {
    id: number;
    nome: string;
    email: string;
    telefone: string;
}

export default function CardUser(usuarios: Usuarios) {

    const navigate = useNavigate();


    return (
        <div className={Style.div}>
            <div className={Style.card} >
                <div className={Style.card__infos}>
                    <div className={Style.row}>
                        <img src={UserIcon} alt="" />
                        <h1>{usuarios.nome}</h1>
                    </div>
                    <div className={Style.row}>
                        <img src={MailIcon} alt="" />
                        <h2>{usuarios.email}</h2>
                    </div>
                    <div className={Style.row}>
                        <img src={PhoneIcon} alt="" />
                        <h2>{usuarios.telefone}</h2>
                    </div>
                </div>
                <div className={Style.card__icons}>
                    <Link to={`userCreate/${usuarios.id}`}>
                        <img src={EditIcon} alt="" className={Style.edit} />
                    </Link>
                    <button onClick={() => navigate({
                        pathname: `/atividade`,
                        search: usuarios.id.toString()
                    }
                    )}>
                        <img src={TasksIcon} alt="" />
                    </button>
                    <Link to={`deleteUser/${usuarios.id}`}>
                        <img src={DeleteIcon} alt="" className={Style.delete} />
                    </Link>
                </div>
            </div>
        </div>
    )
}