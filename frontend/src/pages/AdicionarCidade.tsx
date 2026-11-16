import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { fetchCidadeById, addCidade, updateCidade } from '../services/api/cidades';
import { fetchPaises } from '../services/api/paises';
import type { Cidade } from '../services/api/cidades';
import type { Pais } from '../services/api/paises';
import BackButton from '../components/BackButton';

const AdicionarCidade: React.FC = () => {
  const [nome, setNome] = useState<string>('');
  const [populacao, setPopulacao] = useState<string>('');
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');
  const [paisId, setPaisId] = useState<string>('');

  const [paises, setPaises] = useState<Pais[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadPaises = async () => {
      try {
        const lista = await fetchPaises();
        setPaises(lista);
      } catch {
        setPaises([]);
      }
    };
    loadPaises();
  }, []);

  useEffect(() => {
    if (id) {
      setIsEditing(true);

      const loadCidade = async () => {
        try {
          const cidade: Cidade | null = await fetchCidadeById(id);
          if (cidade) {
            setNome(cidade.nome);
            setPopulacao(cidade.populacao.toString());
            setLatitude(cidade.latitude.toString());
            setLongitude(cidade.longitude.toString());
            setPaisId(cidade.paisId.toString());
          } else {
            setErrorMessage('City not found.');
          }
        } catch (error) {
          setErrorMessage('Error loading city.');
        }
      };

      loadCidade();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const payload = {
      nome,
      populacao: Number(populacao),
      latitude: Number(latitude),
      longitude: Number(longitude),
      paisId: Number(paisId),
    };

    try {
      if (isEditing) {
        await updateCidade(id!, payload);
      } else {
        await addCidade(payload);
      }
      navigate('/cidades');
    } catch (error) {
      setErrorMessage('Error saving the city. Please try again.');
    }
  };

  return (
    <div className="page">
      <BackButton />
      <h1 className="page-title">
        {isEditing ? 'Edit City' : 'Add City'}
      </h1>

      {errorMessage && <p className="alert-error">{errorMessage}</p>}

      <form onSubmit={handleSubmit} className="card mx-auto max-w-md">

        <div className="mb-4">
          <label className="form-label">Name</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="form-input"
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Population</label>
          <input
            type="number"
            value={populacao}
            onChange={(e) => setPopulacao(e.target.value)}
            className="form-input"
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Latitude</label>
          <input
            type="number"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            className="form-input"
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Longitude</label>
          <input
            type="number"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            className="form-input"
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Country</label>
          <select
            value={paisId}
            onChange={(e) => setPaisId(e.target.value)}
            className="form-input"
            required
          >
            <option value="">Select Country</option>

            {paises.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nome}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
        >
          {isEditing ? 'Save Changes' : 'Add City'}
        </button>
      </form>
    </div>
  );
};

export default AdicionarCidade;