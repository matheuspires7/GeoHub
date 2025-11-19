import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchContinenteById } from '../services/api/continentes';
import BackButton from '../components/BackButton';

const VisualizarContinente: React.FC = () => {
  const { id } = useParams();
  const [continente, setContinente] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const loadContinente = async () => {
      try {
        const data = await fetchContinenteById(Number(id));
        setContinente(data);
      } catch (error) {
        setErrorMessage('Erro ao carregar continente.');
      }
    };

    loadContinente();
  }, [id]);

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  return (
    <div className="container mx-auto p-6">
      {/* Botão de Voltar */}
      <BackButton />

      {continente ? (
        <>
          <h1 className="text-3xl font-bold text-center text-white">{continente.nome}</h1>
          <p className="mt-4 text-center text-white">{continente.descricao}</p>
        </>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default VisualizarContinente;
