import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPaises, deletePais } from '../services/api/paises';
import type { Pais } from '../services/api/paises';
import BackButton from '../components/BackButton';

const Paises: React.FC = () => {
  const [paises, setPaises] = useState<Pais[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const loadPaises = async () => {
      try {
        const data = await fetchPaises();
        setPaises(data);
      } catch (error) {
        setErrorMessage('Erro ao carregar países.');
      }
    };
    loadPaises();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este país?')) {
      try {
        await deletePais(id.toString());
        setPaises((prev) => prev.filter((p) => p.id !== id));
      } catch (error) {
        setErrorMessage('Erro ao excluir o país.');
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center">Cadastro de Países</h1>

      {errorMessage && (
        <p className="text-red-500 text-center mt-3">{errorMessage}</p>
      )}

      <BackButton />

      <div className="mt-8">
        <ul className="space-y-4">
          {paises.map((pais) => (
            <li key={pais.id} className="flex justify-between items-center border-b pb-2">
              <span className="text-lg">{pais.nome}</span>

              <div>
                <Link
                  to={`/paises/editar/${pais.id}`}
                  className="text-blue-500 hover:text-blue-700 mr-3"
                >
                  Editar
                </Link>

                <button
                  onClick={() => handleDelete(pais.id)}
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
          to="/paises/adicionar"
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700"
        >
          Adicionar Novo País
        </Link>
      </div>
    </div>
  );
};

export default Paises;
