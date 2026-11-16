import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPaisById, addPais, updatePais, type Pais } from "../services/api/paises";
import { fetchContinentes } from "../services/api/continentes";
import { getCountryData, type CountryData } from "../services/api/apisExternas";
import BackButton from "../components/BackButton";

const AdicionarPais: React.FC = () => {
  const [nome, setNome] = useState<string>("");
  const [populacao, setPopulacao] = useState<string>("");
  const [idioma, setIdioma] = useState<string>("");
  const [moeda, setMoeda] = useState<string>("");
  const [continenteId, setContinenteId] = useState<string>("");
  const [urlBandeira, setUrlBandeira] = useState<string>("");
  const [pibPerCapita, setPibPerCapita] = useState<string>("");
  const [inflacao, setInflacao] = useState<string>("");

  const [continentes, setContinentes] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { id } = useParams();
  const navigate = useNavigate();

  const [pesquisaNome, setPesquisaNome] = useState<string>("");

  useEffect(() => {
    const loadContinentes = async () => {
      const lista = await fetchContinentes();
      setContinentes(lista.data);
    };
    loadContinentes();
  }, []);

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      const loadPais = async () => {
        try {
          const pais: Pais | null = await fetchPaisById(id);
          if (pais) {
            setNome(pais.nome);
            setPopulacao(pais.populacao.toString());
            setIdioma(pais.idiomaOficial);
            setMoeda(pais.moeda);
            setContinenteId(pais.continenteId.toString());
            setUrlBandeira(pais.url_bandeira ?? "");
            setPibPerCapita(pais.pib_per_capita?.toString() ?? "");
            setInflacao(pais.inflacao?.toString() ?? "");
          } else {
            setErrorMessage("Country not found.");
          }
        } catch {
          setErrorMessage("Error loading country.");
        }
      };
      loadPais();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const payload = {
      nome,
      populacao: Number(populacao),
      idiomaOficial: idioma,
      moeda,
      continenteId: Number(continenteId),
      url_bandeira: urlBandeira || null,
      pib_per_capita: pibPerCapita ? Number(pibPerCapita) : null,
      inflacao: inflacao ? Number(inflacao) : null,
    };

    try {
      if (isEditing && id) {
        await updatePais(id, payload);
      } else {
        await addPais(payload);
      }
      navigate("/paises");
    } catch {
      setErrorMessage("Error saving the country. Please try again.");
    }
  };

  // Pesquisar país na API externa
  const handlePesquisar = async () => {
    if (!pesquisaNome) {
      setErrorMessage("Enter the name of the country to search for (in English).");
      return;
    }
    setErrorMessage("");
    try {
      const data: CountryData | null = await getCountryData(pesquisaNome);
      if (data) {
        setNome(data.name ?? "");
        setPopulacao(data.population?.toString() ?? "");
        setIdioma(data.language ?? "");
        setMoeda(data.currencySymbol ?? "");
        setUrlBandeira(data.flagUrl ?? "");
        setPibPerCapita(data.gdpPerCapita?.toString() ?? "");
        setInflacao(data.inflation?.toString() ?? "");
      } else {
        setErrorMessage("Country not found in the external API.");
      }
    } catch {
      setErrorMessage("Error fetching country from external API.");
    }
  };

  return (
    <div className="page">
      <BackButton />
      <h1 className="page-title">
        {isEditing ? "Edit Country" : "Add Country"}
      </h1>

      {errorMessage && <p className="alert-error">{errorMessage}</p>}

      <div className="card mx-auto mb-6 flex max-w-md gap-2">
        <input
          type="text"
          value={pesquisaNome}
          onChange={(e) => setPesquisaNome(e.target.value)}
          placeholder="Enter the name of the country"
          className="form-input flex-1"
        />
        <button
          type="button"
          onClick={handlePesquisar}
          className="btn btn-success"
        >
          Search
        </button>
      </div>

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
          <label className="form-label">Official Language</label>
          <input
            type="text"
            value={idioma}
            onChange={(e) => setIdioma(e.target.value)}
            className="form-input"
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Currency</label>
          <input
            type="text"
            value={moeda}
            onChange={(e) => setMoeda(e.target.value)}
            className="form-input"
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Continent</label>
          <select
            value={continenteId}
            onChange={(e) => setContinenteId(e.target.value)}
            className="form-input"
            required
          >
            <option value="">Select Continent</option>
            {continentes.map((c) => (
              <option key={c.id} value={c.id}>{c.nome}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="form-label">Flag URL</label>
          <input
            type="text"
            value={urlBandeira}
            onChange={(e) => setUrlBandeira(e.target.value)}
            className="form-input"
          />
          {urlBandeira && (
            <img src={urlBandeira} alt="Bandeira" className="mt-2 h-16" />
          )}
        </div>

        <div className="mb-4">
          <label className="form-label">GDP per capita</label>
          <input
            type="number"
            value={pibPerCapita}
            onChange={(e) => setPibPerCapita(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Inflation (%)</label>
          <input
            type="number"
            value={inflacao}
            onChange={(e) => setInflacao(e.target.value)}
            className="form-input"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
        >
          {isEditing ? "Save Changes" : "Add Country"}
        </button>
      </form>
    </div>
  );
};

export default AdicionarPais;