import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchPaisesComFiltro, deletePais } from "../services/api/paises";
import type { Pais } from "../services/api/paises";
import { fetchContinentes, type Continente } from "../services/api/continentes";
import BackButton from "../components/BackButton";
import Paginacao from "../components/Paginacao";

const PaisesPage: React.FC = () => {
  const [paises, setPaises] = useState<Pais[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [continenteId, setContinenteId] = useState<string>("");
  const [continentes, setContinentes] = useState<Continente[]>([]);

  const [page, setPage] = useState(1);
  const limit = 7;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadContinentes = async () => {
      try {
        const data = await fetchContinentes();
        setContinentes(data.data || []);
      } catch (err) {
        console.error("Error loading continents:", err);
      }
    };
    loadContinentes();
  }, []);

  const loadPaises = async () => {
    try {
      const data = await fetchPaisesComFiltro(
        page,
        limit,
        continenteId ? Number(continenteId) : undefined
      );

      setPaises(data.data);
      setTotalPages(data.totalPages);
    } catch (err) {
      setErrorMessage("Error loading countries.");
    }
  };

  useEffect(() => {
    loadPaises();
  }, [continenteId, page]);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this country?")) {
      try {
        await deletePais(id.toString());
        setPaises((prev) => prev.filter((p) => p.id !== id));
      } catch (err) {
        setErrorMessage("Error deleting the country.");
      }
    }
  };

  return (
    <div className="page">
      <BackButton />
      <h1 className="page-title">Countries Registration</h1>

      {errorMessage && <p className="alert-error">{errorMessage}</p>}

      <div className="mb-6 flex flex-wrap justify-center gap-4">
        <select
          value={continenteId}
          onChange={(e) => {
            setContinenteId(e.target.value);
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
      </div>

      <div className="card">
        {paises.length === 0 ? (
          <p className="text-center text-gray-400">No countries found.</p>
        ) : (
          <ul className="divide-y divide-white/10">
            {paises.map((pais) => (
              <li
                key={pais.id}
                className="flex items-center justify-between gap-4 py-3"
              >
                <span className="text-lg">{pais.nome}</span>

                <div className="flex gap-4">
                  <Link
                    to={`/paises/visualizar/${pais.id}`}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    View
                  </Link>
                  <Link
                    to={`/paises/editar/${pais.id}`}
                    className="text-yellow-400 hover:text-yellow-300"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(pais.id)}
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
        <Link to="/paises/adicionar" className="btn btn-success">
          Add New Country
        </Link>
      </div>
    </div>
  );
};

export default PaisesPage;
