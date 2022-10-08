import React, { useEffect, useLayoutEffect, useState } from "react";

import Style from './search.module.scss';

import ButtonComponent from "../../../components/Buttons";
import { useLocation, useNavigate, useParams } from "react-router";
import { httpHome } from "../../../http";
import CardTasks from '../CardsTask/index'
import DeleteIcon from '../../../assets/deleteIcon.svg';

interface Props {
    type: 'o usuário' | 'a atividade';
}

type Task = {
    id: number;
    dataDeCriacao: Date;
    nome: string;
    id_user: number;
    nome_user: string;
}

interface Usuarios {
    id: number;
    nome: string;
}


export function refreshPage() {
    window.location.reload();
}

var nItens: number[] = [];

export const addDelete = async (idDelete: number, checked: boolean) => {
    if (checked) {
        nItens.push(idDelete);
    } else {
        nItens.splice(nItens.indexOf(idDelete), 1);
    }
    //setNitens([idDelete, ...nItens])
}

export default function Search(props: Props) {

    const [nomeSearch, setNomeSearch] = useState<string>('');
    const [userSearch, setUserSearch] = useState<string>('-1');
    const [orderSearch, setOrderSearch] = useState<string>('0');

    const [tasks, setTasks] = useState<Task[]>([]);
    const [users, setUsers] = useState<Usuarios[]>([]);

    const navigate = useNavigate();
    const location = useLocation();

    const [load, setLoad] = useState(false);
    const [idExcluir, setExcluir] = useState(0);


    const DeleteTasks = () => {
        navigate(`deleteTask/${nItens}`);
    }

    const atribuiNomeUser = (task: Task) => {
        let nome = users.find((user) => user.id === task.id_user)?.nome;
        return nome ? nome : '';
    }

    useEffect(() => {
        const fetchUsers = async () => {
            const userFetch = await httpHome.get('user/').then((res) => {
                setUsers(res.data);
            });
            if (users.length == 0) {
                return setLoad(!load);
            }
            return fetchTasks();
        }
        fetchUsers();
    }, [load])

    const fetchTasks = () => {
        let url = location.pathname;

        url += `/busca/`;

        let nome = nomeSearch === '' ? null : nomeSearch;
        let id_user = userSearch === '-1' ? null : parseInt(userSearch)

        if (location.search != '') {
            console.log(location.search);
            id_user = parseInt(location.search.replace('?', ''))
        }

        const teste = async () => {
            const res = await httpHome
                .get<Task[]>(url, {
                    params: {
                        nome,
                        id_user
                    }
                })

            let tasksTemp = res.data;
            tasksTemp.forEach((task) => task.nome_user = atribuiNomeUser(task));
            setTasks(tasksTemp);

            setUserSearch('-1');
            setOrderSearch('0');
            setNomeSearch('');
            location.search = ('');
            return;
        }
        teste();
    }

    const formSubmit = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        fetchTasks();
    }

    async function orderTasks(order: string) {
        let sortedTask: Task[] = [];
        switch (order) {
            case '1':
                sortedTask = tasks.sort((a, b) => (a.nome_user < b.nome_user) ? -1 : 1);
                break;

            case '2':
                sortedTask = tasks.sort((a, b) => (a.nome_user > b.nome_user) ? -1 : 1);
                break;

            case '3':
                sortedTask = tasks.sort((a, b) => (a.dataDeCriacao > b.dataDeCriacao) ? -1 : 1);
                break;

            case '4':
                sortedTask = tasks.sort((a, b) => (a.dataDeCriacao < b.dataDeCriacao) ? -1 : 1);
                break;
            default:
                sortedTask = tasks
                break;
        }
        setTasks(sortedTask)
        setOrderSearch(order)
    }

    const verificaDelete = () => {
        if (nItens.length == 0) {
            return (
                alert("Nenhum item selecionado")
            )
        }
        return DeleteTasks();
    }

    return (
        <div className={Style.section}>
            <form className={Style.form} onSubmit={formSubmit}>
                <div className={Style.busca}>
                    <div className={Style.inputGroup}>
                        <input
                            className={Style.input}
                            type="text"
                            name="nome"
                            value={nomeSearch}
                            maxLength={35}
                            onChange={(e) => setNomeSearch(e.target.value)}
                            placeholder={`Digite o nome d${props.type}`}
                        />
                    </div>
                    <ButtonComponent name="Buscar" type="submit"></ButtonComponent>
                </div>
                <div className={Style.row}>
                    <select className={Style.input} value={userSearch} onChange={(e) => setUserSearch(e.target.value)}>
                        <option>Selecione o usuário</option>
                        {users?.map((user) => (
                            <option value={user.id} key={user.id}>{user.nome}</option>
                        ))}
                    </select>
                    <select className={Style.input} value={orderSearch} onChange={(e) => orderTasks(e.target.value)}>
                        <option disabled value={'0'}>Ordernar por</option>
                        <option value={'1'}>Usuário (A-Z)</option>
                        <option value={'2'}>Usuário (Z-A)</option>
                        <option value={'3'}>Data (desc)</option>
                        <option value={'4'}>Data (asc)</option>
                    </select>
                </div>
            </form>
            <div>
                {
                    tasks.length > 0 ? tasks.map((task) => (
                        <CardTasks id={task.id} nome={task.nome} id_user={task.id} nome_user={task.nome_user} key={task.id} dataDeCriacao={task.dataDeCriacao} />
                    )) : (
                        <div className={Style.notFound}>
                            <h1>Nenhum dado encontrado</h1>
                            {/* <button onClick={() => setLoad(!load)}>Buscar todos os dados</button> */}
                        </div>
                    )
                }
            </div>
            <div className={Style.deleteButton}>
                <button onClick={verificaDelete}>
                    <img src={DeleteIcon} alt="" />
                </button>
            </div>
        </div>
    )
}