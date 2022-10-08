import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './components/Header/index';
import Button from './components/Buttons/index';
import Input from './components/Inputs/index';
import CardTask from './Page/Atividades/CardsTask/index';
import reportWebVitals from './reportWebVitals';

import Router from './router'
import CardUser from './Page/Usuarios/CardsUser';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);

reportWebVitals();
