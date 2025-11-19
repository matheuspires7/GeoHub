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
      <div className="container mx-auto p-6">
        <BackButton />
        <p className="text-red-500 text-center mt-3">{errorMessage}</p>
      </div>
    );
  }

  if (!pais) {
    return (
      <div className="container mx-auto p-6 text-center">
        <BackButton />
        <p>Loading country data...</p>
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
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Country Details</h1>

      <BackButton />

      <div className="mt-6 border rounded-lg p-6 bg-white shadow-md max-w-lg mx-auto text-gray-900 space-y-2">
        <p><strong>Name:</strong> {pais.nome}</p>
        <p><strong>Population:</strong> {pais.populacao.toLocaleString()}</p>
        <p><strong>Official Language:</strong> {pais.idiomaOficial}</p>
        <p><strong>Currency:</strong> {pais.moeda}</p>
        <p><strong>Continent:</strong> {continenteNome}</p>
        {pais.url_bandeira && (
          <div>
            <strong>Flag:</strong>
            <img
              src={pais.url_bandeira}
              alt={`Flag of ${pais.nome}`}
              className="mt-2 w-40 h-auto border"
            />
          </div>
        )}
        <p><strong>GDP per capita:</strong> {pais.pib_per_capita !== undefined && pais.pib_per_capita !== null ? `$${formatNumber(pais.pib_per_capita)}` : "Not available"}</p>
        <p><strong>Inflation:</strong> {pais.inflacao !== undefined && pais.inflacao !== null ? `${formatNumber(pais.inflacao)}%` : "Not available"}</p>
      </div>

      <div className="mt-6 text-center">
        <Link
          to="/paises"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Return to Countries
        </Link>
      </div>
    </div>
  );
};

export default VisualizarPais;
