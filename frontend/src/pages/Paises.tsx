import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchPaisesComFiltro, deletePais } from "../services/api/paises";
import type { Pais } from "../services/api/paises";
import { fetchContinentes, type Continente } from "../services/api/continentes";
import BackButton from "../components/BackButton";

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
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center">Countries Registration</h1>

      {errorMessage && (
        <p className="text-red-500 text-center mt-3">{errorMessage}</p>
      )}

      <BackButton />

      <div className="mt-6 flex flex-wrap gap-4 justify-center">
        <select
          value={continenteId}
          onChange={(e) => {
            setContinenteId(e.target.value);
            setPage(1);
          }}
          className="border p-2 rounded w-full sm:w-auto"
        >
          <option value="">Filter by Continent</option>
          {continentes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-8">
        <ul className="space-y-4">
          {paises.map((pais) => (
            <li
              key={pais.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <span className="text-lg">{pais.nome}</span>

              <div>
                <Link
                  to={`/paises/visualizar/${pais.id}`}
                  className="text-blue-600 hover:text-blue-800 mr-3"
                >
                  View
                </Link>

                <Link
                  to={`/paises/editar/${pais.id}`}
                  className="text-yellow-500 hover:text-blue-yellow mr-3"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(pais.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-center gap-4 mt-6 flex-wrap">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 rounded disabled:opacity-50 w-full sm:w-auto"
        >
          Previous
        </button>

        <span className="text-lg font-medium">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2  rounded disabled:opacity-50 w-full sm:w-auto"
        >
          Next
        </button>
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/paises/adicionar"
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700"
        >
          Add New Country
        </Link>
      </div>
    </div>
  );
};

export default PaisesPage;
