import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Continentes from './pages/Continentes';
import Paises from './pages/Paises';
import Cidades from './pages/Cidades';
import AdicionarCidade from './pages/AdicionarCidade';
import AdicionarContinente from './pages/AdicionarContinente';
import AdicionarPais from './pages/AdicionarPais';
import VisualizarCidade from './pages/VisualizarCidade'; 
import VisualizarPais from './pages/VisualizarPais';
import VisualizarContinente from './pages/VisualizarContinente';
import Login from './pages/Login';
import RotaProtegida from './components/RotaProtegida';
import Usuarios from './pages/Usuarios';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* tudo aqui dentro só abre com login */}
        <Route element={<RotaProtegida />}>
          <Route path="/" element={<Home />} />
          <Route path="/continentes" element={<Continentes />} />
          <Route path="/continentes/adicionar" element={<AdicionarContinente />} />
          <Route path="/continentes/editar/:id" element={<AdicionarContinente />} />
          <Route path="/continentes/visualizar/:id" element={<VisualizarContinente />}/>

          <Route path="/paises" element={<Paises />} />
          <Route path="/paises/adicionar" element={<AdicionarPais />} />
          <Route path="/paises/editar/:id" element={<AdicionarPais />} />
          <Route path="/paises/visualizar/:id" element={<VisualizarPais/>}/>

          <Route path="/cidades" element={<Cidades />} />
          <Route path="/cidades/adicionar" element={<AdicionarCidade />} />
          <Route path="/cidades/editar/:id" element={<AdicionarCidade />} />
          <Route path="/cidades/visualizar/:id" element={<VisualizarCidade />} />
          <Route path="/usuarios" element={<Usuarios />} /> 
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
