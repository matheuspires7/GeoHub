import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchContinenteById } from "../services/api/continentes";

interface Pais {
  id: number;
  nome: string;
  populacao: number;
  moeda: string;
  idiomaOficial: string;
}

interface ContinenteDetalhes {
  id: number;
  nome: string;
  descricao?: string; 
  paises?: Pais[];
}

const VisualizarContinente: React.FC = () => {
  const { id } = useParams();
  const [continente, setContinente] = useState<ContinenteDetalhes | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadContinente = async () => {
      try {
        if (!id) return;

        const data = await fetchContinenteById(Number(id));
        setContinente(data);
      } catch (error) {
        console.error("Error loading continent:", error);
        setErrorMessage("Error loading continent details.");
      }
    };

    loadContinente();
  }, [id]);

  if (errorMessage) {
    return (
      <div className="page">
        <p className="alert-error">{errorMessage}</p>
      </div>
    );
  }

  if (!continente) {
    return (
      <div className="page">
        <p className="text-center text-gray-400">Loading data...</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1 className="page-title">Continent Details: {continente.nome}</h1>

      <dl className="card mx-auto max-w-lg space-y-4">
        <div>
          <dt className="text-sm text-gray-400">Name</dt>
          <dd className="text-lg">{continente.nome}</dd>
        </div>

        {continente.descricao && (
          <div>
            <dt className="text-sm text-gray-400">Description</dt>
            <dd className="text-lg">{continente.descricao}</dd>
          </div>
        )}

        {continente.paises && continente.paises.length > 0 && (
          <div>
            <dt className="text-sm text-gray-400">Countries</dt>
            <dd>
              <ul className="ml-6 mt-1 list-disc text-lg">
                {continente.paises.map((pais) => (
                  <li key={pais.id}>
                    {pais.nome} - {pais.populacao.toLocaleString("pt-BR")} hab.
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        )}
      </dl>

      <div className="mt-8 text-center">
        <Link to="/continentes" className="btn btn-primary">
          Back
        </Link>
      </div>
    </div>
  );
};

export default VisualizarContinente;
