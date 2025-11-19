import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchContinenteById,
  addContinente,
  updateContinente,
} from "../services/api/continentes";
import type { Continente } from "../services/api/continentes";
import BackButton from "../components/BackButton";

const AdicionarContinente: React.FC = () => {
  const [nome, setNome] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      const loadContinente = async () => {
        try {
          const idNumber = parseInt(id, 10);
          if (isNaN(idNumber)) {
            setErrorMessage("Invalid ID.");
            return;
          }

          const continente: Continente | null = await fetchContinenteById(
            idNumber
          );
          if (continente) {
            setNome(continente.nome);
            setDescricao(continente.descricao);
          } else {
            setErrorMessage("Continent not found.");
          }
        } catch (error) {
          setErrorMessage("Error loading continent.");
        }
      };
      loadContinente();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      if (isEditing) {
        const idNumber = parseInt(id!, 10);
        if (isNaN(idNumber)) {
          setErrorMessage("Invalid ID.");
          return;
        }
        await updateContinente(idNumber, { nome, descricao });
      } else {
        await addContinente({ nome, descricao });
      }
      navigate("/continentes");
    } catch (error) {
      setErrorMessage("Error saving continent. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6">
        <BackButton />
      <h1 className="text-3xl font-bold text-center">
        {isEditing ? "Edit Continent" : "Add Continent"}
      </h1>

      {errorMessage && (
        <p className="text-red-500 text-center">{errorMessage}</p>
      )}

      <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="nome" className="block text-lg font-semibold">
            Name
          </label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="descricao" className="block text-lg font-semibold">
            Description
          </label>
          <textarea
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          {isEditing ? "Save Changes" : "Add Continent"}
        </button>
      </form>
    </div>
  );
};

export default AdicionarContinente;