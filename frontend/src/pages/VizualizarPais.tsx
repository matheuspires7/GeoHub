import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchPaisById } from "../services/api/paises";
import type { Pais } from "../services/api/paises";
import BackButton from "../components/BackButton";

const VisualizarPais: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pais, setPais] = useState<Pais | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const loadPais = async () => {
      if (!id) {
        setErrorMessage("ID do país não fornecido.");
        return;
      }

      try {
        const paisData = await fetchPaisById(id);
        if (paisData) {
          setPais(paisData);
        } else {
          setErrorMessage("País não encontrado.");
        }
      } catch (error) {
        setErrorMessage("Erro ao carregar os detalhes do país.");
      }
    };

    loadPais();
  }, [id]);

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  if (!pais) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center">Detalhes do País</h1>

      <BackButton />

      <div className="mt-8">
        <div className="text-lg font-semibold">Nome:</div>
        <div>{pais.nome}</div>

        <div className="mt-4 text-lg font-semibold">População:</div>
        <div>{pais.populacao}</div>

        <div className="mt-4 text-lg font-semibold">Idioma Oficial:</div>
        <div>{pais.idiomaOficial}</div>

        <div className="mt-4 text-lg font-semibold">Moeda:</div>
        <div>{pais.moeda}</div>
      </div>
    </div>
  );
};

export default VisualizarPais;
