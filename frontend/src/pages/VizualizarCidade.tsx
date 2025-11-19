import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchCidadeById } from "../services/api/cidades";
import type { Cidade } from "../services/api/cidades";
import BackButton from "../components/BackButton";

const VisualizarCidade: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [cidade, setCidade] = useState<Cidade | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const loadCidade = async () => {
      if (!id) {
        setErrorMessage("ID não encontrado na URL.");
        return;
      }

      try {
        const data = await fetchCidadeById(id);
        setCidade(data);
      } catch (error) {
        setErrorMessage("Erro ao carregar detalhes da cidade.");
      }
    };

    loadCidade();
  }, [id]);

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  return (
    <div className="container mx-auto p-6">
      {/* Botão de Voltar */}
      <BackButton />

      {cidade ? (
        <>
          <h1 className="text-3xl font-bold text-center">{cidade.nome}</h1>
          <div className="mt-4">
            <div className="text-lg font-semibold">População:</div>
            <div>{cidade.populacao}</div>

            <div className="mt-4 text-lg font-semibold">Latitude:</div>
            <div>{cidade.latitude}</div>

            <div className="mt-4 text-lg font-semibold">Longitude:</div>
            <div>{cidade.longitude}</div>
          </div>
        </>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default VisualizarCidade;
