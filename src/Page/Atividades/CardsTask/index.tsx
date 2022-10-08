import React, { useContext, useEffect, useState } from "react";
import Style from './cardtask.module.scss';
import DeleteIcon from '../../../assets/delete.svg'
import EditIcon from '../../../assets/edit.svg'
import { httpHome } from "../../../http";
import { Link } from "react-router-dom";
import { SearchContext } from '../../../contexts/SearchContext';
import { addDelete } from '../Search/index'

type Task = {
    id: number;
    nome: string;
    id_user: number;
    nome_user?: string;
    dataDeCriacao: Date;
}

function CardsTask(task: Task) {

    const [checked, setChecked] = useState(false);

    useEffect(() => {
        addDelete(task.id, checked);
    }, [checked]);

    return (
        <div>   
            < div className={Style.cardGroup} key={task.id} >
                <div className={Style.checkbox}>
                    <input
                        type="checkbox"
                        defaultChecked = {checked}
                        onChange={() => setChecked(!checked)}
                    />
                </div>
                <div className={checked == true ? Style.card + ' ' + Style.card__active : Style.card}>
                    <div className={Style.id}>
                        {'#' + task.id}
                    </div>
                    <div className={Style.infos}>
                        <p>{task.nome}</p>
                        <p>{task.nome_user}</p>
                    </div>
                    <div className={Style.icons}>
                        <Link to={`editarAtividade/${task.id}`}>
                            <img src={EditIcon} alt="" />
                        </Link>
                        <Link to={`deleteTask/${task.id}`}>
                            <img src={DeleteIcon} alt="" />
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default CardsTask;