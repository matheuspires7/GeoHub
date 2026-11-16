import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchCidades, deleteCidade } from "../services/api/cidades";
import type { Cidade } from "../services/api/cidades";

import { fetchPaises } from "../services/api/paises";
import { fetchContinentes } from "../services/api/continentes";

import BackButton from "../components/BackButton";
import Paginacao from "../components/Paginacao";

const Cidades: React.FC = () => {
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const [paisId, setPaisId] = useState("");
  const [continenteId, setContinenteId] = useState("");

  const [paises, setPaises] = useState<any[]>([]);
  const [continentes, setContinentes] = useState<any[]>([]);

  const [page, setPage] = useState(1);
  const limit = 7;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadFiltersData = async () => {
      try {
        const listaPaises = await fetchPaises();
        setPaises(listaPaises);

        const listaContinentes = await fetchContinentes();
        setContinentes(listaContinentes.data || []);
      } catch (err) {
        console.error("Error loading lists:", err);
      }
    };

    loadFiltersData();
  }, []);

  const loadCidades = async () => {
    try {
      const params: any = { page, limit };

      if (paisId) params.paisId = Number(paisId);
      if (continenteId) params.continenteId = Number(continenteId);

      const data = await fetchCidades(params);

      setCidades(data.data);
      setTotalPages(data.totalPages);
    } catch (error) {
      setErrorMessage("Error loading cities.");
    }
  };

  useEffect(() => {
    loadCidades();
  }, [paisId, continenteId, page]);

  const paisesFiltrados = continenteId
    ? paises.filter((p) => p.continenteId === Number(continenteId))
    : paises;

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this city?")) {
      try {
        await deleteCidade(id.toString());
        setCidades((prev) => prev.filter((cidade) => cidade.id !== id));
      } catch (error) {
        setErrorMessage("Error deleting the city.");
      }
    }
  };

  return (
    <div className="page">
      <BackButton />
      <h1 className="page-title">Cities Registration</h1>

      {errorMessage && <p className="alert-error">{errorMessage}</p>}

      <div className="mb-6 flex flex-wrap justify-center gap-4">
        <select
          value={continenteId}
          onChange={(e) => {
            setContinenteId(e.target.value);
            setPaisId("");
            setPage(1);
          }}
          className="form-input sm:w-auto"
        >
          <option value="">Filter by Continent</option>
          {continentes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nome}
            </option>
          ))}
        </select>

        <select
          value={paisId}
          onChange={(e) => {
            setPaisId(e.target.value);
            setPage(1);
          }}
          className="form-input sm:w-auto"
        >
          <option value="">Filter by Country</option>
          {paisesFiltrados.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="card">
        {cidades.length === 0 ? (
          <p className="text-center text-gray-400">No cities found.</p>
        ) : (
          <ul className="divide-y divide-white/10">
            {cidades.map((cidade) => (
              <li
                key={cidade.id}
                className="flex items-center justify-between gap-4 py-3"
              >
                <span className="text-lg">{cidade.nome}</span>

                <div className="flex gap-4">
                  <Link
                    to={`/cidades/visualizar/${cidade.id}`}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    View
                  </Link>
                  <Link
                    to={`/cidades/editar/${cidade.id}`}
                    className="text-yellow-400 hover:text-yellow-300"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(cidade.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Paginacao page={page} totalPages={totalPages} onChange={setPage} />

      <div className="mt-8 text-center">
        <Link to="/cidades/adicionar" className="btn btn-success">
          Add New City
        </Link>
      </div>
    </div>
  );
};

export default Cidades;
