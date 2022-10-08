import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import UserCreate from "./Page/Usuarios/CreateUser/index";

import Header from "./components/Header/index";
import ModalDelete from "./components/DeleteModal/index";
import Atividades from "./Page/Atividades/Atividades";
import Usuario from "./Page/Usuarios/index";
import ModalCreate from "./Page/Atividades/CreateTask";


export default function RouteIndex() {
    return (
        <BrowserRouter>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Usuario />}>
                        <Route path="deleteUser/:id" element={<ModalDelete type='user' titulo="USUÁRIO" texto="usuário" url="user/" />} />
                    </Route>
                    <Route path="userCreate/" element={<UserCreate titulo="Criar" />} />
                    <Route path="userCreate/:id" element={<UserCreate titulo="Editar" />} />
                    <Route path="atividade/" element={<Atividades />}>
                        <Route path="novaAtividade/" element={<ModalCreate />} />
                        <Route path="editarAtividade/:id" element={<ModalCreate />} />
                        <Route path="deleteTask/:id" element={<ModalDelete type="atv" titulo="ATIVIDADE" texto="atividade" url="atividade/" />} />
                    </Route>
                </Routes>
            </main >
        </BrowserRouter>
    )
}