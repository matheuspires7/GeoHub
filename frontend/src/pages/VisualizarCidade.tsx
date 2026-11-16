import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchCidadeById } from "../services/api/cidades";

interface Continente {
  id: number;
  nome: string;
}

interface Pais {
  id: number;
  nome: string;
  populacao: number;
  moeda: string;
  idiomaOficial: string;
  continente: Continente;
}

interface CidadeDetalhes {
  id: number;
  nome: string;
  pais: Pais;
}

const VisualizarCidade: React.FC = () => {
  const { id } = useParams();
  const [cidade, setCidade] = useState<CidadeDetalhes | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadCidade = async () => {
      try {
        if (!id) return;

        const cidadeCarregada = await fetchCidadeById(id!);

        setCidade(cidadeCarregada);
      } catch (error) {
        console.error("Error loading city:", error);
        setErrorMessage("Error loading city details.");
      }
    };

    loadCidade();
  }, [id]);

  if (errorMessage) {
    return (
      <div className="page">
        <p className="alert-error">{errorMessage}</p>
      </div>
    );
  }

  if (!cidade) {
    return (
      <div className="page">
        <p className="text-center text-gray-400">Loading data...</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1 className="page-title">Details of {cidade.nome}</h1>

      <dl className="card mx-auto max-w-lg space-y-4">
        <div>
          <dt className="text-sm text-gray-400">City</dt>
          <dd className="text-lg">{cidade.nome}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-400">Country</dt>
          <dd className="text-lg">{cidade.pais.nome}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-400">Continent</dt>
          <dd className="text-lg">{cidade.pais.continente.nome}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-400">Country population</dt>
          <dd className="text-lg">{cidade.pais.populacao.toLocaleString("pt-BR")}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-400">Official Language</dt>
          <dd className="text-lg">{cidade.pais.idiomaOficial}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-400">Currency</dt>
          <dd className="text-lg">{cidade.pais.moeda}</dd>
        </div>
      </dl>

      <div className="mt-8 text-center">
        <Link to="/cidades" className="btn btn-primary">
          Back
        </Link>
      </div>
    </div>
  );
};

export default VisualizarCidade;
