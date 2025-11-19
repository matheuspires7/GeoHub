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
    return <p className="text-center text-red-600 mt-10">{errorMessage}</p>;
  }

  if (!cidade) {
    return <p className="text-center text-gray-600 mt-10">Loading data...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl text-gray-900">
      <h1 className="text-3xl font-bold text-center mb-4">
        Details of {cidade.nome}
      </h1>

      <div className="space-y-4 text-lg">
        <div>
          <span className="font-semibold">City:</span> {cidade.nome}
        </div>

        <div>
          <span className="font-semibold">Country:</span> {cidade.pais.nome}
        </div>

        <div>
          <span className="font-semibold">Continent:</span>{" "}
          {cidade.pais.continente.nome}
        </div>

        <div>
          <span className="font-semibold">Country population:</span>{" "}
          {cidade.pais.populacao.toLocaleString("pt-BR")}
        </div>

        <div>
          <span className="font-semibold">Official Language:</span>{" "}
          {cidade.pais.idiomaOficial}
        </div>

        <div>
          <span className="font-semibold">Currency:</span> {cidade.pais.moeda}
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/cidades"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Back
        </Link>
      </div>
    </div>
  );
};

export default VisualizarCidade;
