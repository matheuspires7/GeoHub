import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import BackButton from "../components/BackButton";
import { fetchPaisById, type Pais } from "../services/api/paises";
import { fetchContinentes, type Continente } from "../services/api/continentes";

const VisualizarPais: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pais, setPais] = useState<Pais | null>(null);
  const [continentes, setContinentes] = useState<Continente[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const loadContinentes = async () => {
      try {
        const data = await fetchContinentes();
        setContinentes(data.data || []);
      } catch (err) {
        console.error("Error loading continents:", err);
      }
    };

    const loadPais = async () => {
      if (!id) return;

      try {
        const data = await fetchPaisById(id!);
        setPais(data);
      } catch (err) {
        console.error(err);
        setErrorMessage("Error loading country data.");
      }
    };

    loadContinentes();
    loadPais();
  }, [id]);

  if (errorMessage) {
    return (
      <div className="page">
        <BackButton />
        <p className="alert-error">{errorMessage}</p>
      </div>
    );
  }

  if (!pais) {
    return (
      <div className="page">
        <BackButton />
        <p className="text-center text-gray-400">Loading country data...</p>
      </div>
    );
  }

  const continenteNome =
    continentes.find((c) => c.id === pais.continenteId)?.nome || "Unknown";

  const formatNumber = (value: number | string | null | undefined, decimals: number = 2) => {
    if (value === null || value === undefined || isNaN(Number(value))) return "Not available";
    return Number(value).toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  };

  return (
    <div className="page">
      <BackButton />
      <h1 className="page-title">Country Details</h1>

      <dl className="card mx-auto max-w-lg space-y-4">
        <div>
          <dt className="text-sm text-gray-400">Name</dt>
          <dd className="text-lg">{pais.nome}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-400">Population</dt>
          <dd className="text-lg">{pais.populacao.toLocaleString()}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-400">Official Language</dt>
          <dd className="text-lg">{pais.idiomaOficial}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-400">Currency</dt>
          <dd className="text-lg">{pais.moeda}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-400">Continent</dt>
          <dd className="text-lg">{continenteNome}</dd>
        </div>
        {pais.url_bandeira && (
          <div>
            <dt className="text-sm text-gray-400">Flag</dt>
            <dd>
              <img
                src={pais.url_bandeira}
                alt={`Flag of ${pais.nome}`}
                className="mt-2 h-auto w-40 rounded border border-white/10"
              />
            </dd>
          </div>
        )}
        <div>
          <dt className="text-sm text-gray-400">GDP per capita</dt>
          <dd className="text-lg">{pais.pib_per_capita !== undefined && pais.pib_per_capita !== null ? `$${formatNumber(pais.pib_per_capita)}` : "Not available"}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-400">Inflation</dt>
          <dd className="text-lg">{pais.inflacao !== undefined && pais.inflacao !== null ? `${formatNumber(pais.inflacao)}%` : "Not available"}</dd>
        </div>
      </dl>

      <div className="mt-8 text-center">
        <Link to="/paises" className="btn btn-primary">
          Return to Countries
        </Link>
      </div>
    </div>
  );
};

export default VisualizarPais;
