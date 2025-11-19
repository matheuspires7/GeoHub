import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchCidades, deleteCidade } from '../services/api/cidades';
import type { Cidade } from '../services/api/cidades';
import BackButton from '../components/BackButton';

const Cidades: React.FC = () => {
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const loadCidades = async () => {
      try {
        const data = await fetchCidades();
        setCidades(data);
      } catch (error) {
        setErrorMessage('Erro ao carregar as cidades.');
      }
    };
    loadCidades();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta cidade?')) {
      try {
        await deleteCidade(id.toString());
        setCidades((prev) => prev.filter((cidade) => cidade.id !== id));
      } catch (error) {
        setErrorMessage('Erro ao excluir a cidade.');
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center">Cadastro de Cidades</h1>

      {errorMessage && (
        <p className="text-red-500 text-center mt-3">{errorMessage}</p>
      )}

      <BackButton />

      <div className="mt-8">
        <ul className="space-y-4">
          {cidades.map((cidade) => (
            <li key={cidade.id} className="flex justify-between items-center border-b pb-2">
              <span className="text-lg">{cidade.nome}</span>

              <div>
                <Link
                  to={`/cidades/visualizar/${cidade.id}`}
                  className="text-blue-500 hover:text-blue-700 mr-3"
                >
                  Visualizar
                </Link>

                <Link
                  to={`/cidades/editar/${cidade.id}`}
                  className="text-yellow-500 hover:text-yellow-700 mr-3"
                >
                  Editar
                </Link>

                <button
                  onClick={() => handleDelete(cidade.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/cidades/adicionar"
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700"
        >
          Adicionar Nova Cidade
        </Link>
      </div>
    </div>
  );
};

export default Cidades;
