import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchContinentes, deleteContinente } from "../services/api/continentes";
import type { Continente } from "../services/api/continentes";
import BackButton from "../components/BackButton";
import Paginacao from "../components/Paginacao";

const Continentes: React.FC = () => {
  const [continentes, setContinentes] = useState<Continente[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [page, setPage] = useState(1);
  const limit = 7;
  const [totalPages, setTotalPages] = useState(1);

  const [reloadTrigger, setReloadTrigger] = useState<number>(0);

  const loadContinentes = async () => {
    setErrorMessage("");
    try {
      const data = await fetchContinentes(page, limit);
      setContinentes(data.data);
      setTotalPages(data.totalPages);
    } catch (error) {
      setErrorMessage("Error loading continents.");
      setContinentes([]);
      setTotalPages(1);
    }
  };

  useEffect(() => {
    loadContinentes();
  }, [page, reloadTrigger]);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this continent?")) {
      try {
        await deleteContinente(id);
        setReloadTrigger((prev) => prev + 1);
      } catch (error) {
        setErrorMessage("Error deleting the continent.");
      }
    }
  };

  return (
    <div className="page">
      <BackButton />
      <h1 className="page-title">Continents Registration</h1>

      {errorMessage && <p className="alert-error">{errorMessage}</p>}

      <div className="card">
        {continentes.length === 0 ? (
          <p className="text-center text-gray-400">No continents registered.</p>
        ) : (
          <ul className="divide-y divide-white/10">
            {continentes.map((continente) => (
              <li
                key={continente.id}
                className="flex items-center justify-between gap-4 py-3"
              >
                <span className="text-lg">{continente.nome}</span>

                <div className="flex gap-4">
                  <Link
                    to={`/continentes/visualizar/${continente.id}`}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    View
                  </Link>
                  <Link
                    to={`/continentes/editar/${continente.id}`}
                    className="text-yellow-400 hover:text-yellow-300"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(continente.id)}
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
        <Link to="/continentes/adicionar" className="btn btn-success">
          Add New Continent
        </Link>
      </div>
    </div>
  );
};

export default Continentes;
