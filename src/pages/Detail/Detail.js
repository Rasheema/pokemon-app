// src/pages/Detail/Detail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import usePokemonStore from "../../zustand/useStore";
import "./Detail.css";

const Detail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [evolution, setEvolution] = useState([]);
  const [showShiny, setShowShiny] = useState(false);

  const { favourites, addFavourite, removeFavourite, customInfo, updateCustomInfo } =
    usePokemonStore();

  const [nickname, setNickname] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        setPokemon(data);

        const speciesRes = await fetch(data.species.url);
        const speciesData = await speciesRes.json();
        setSpecies(speciesData);

        // Evolution chain
        const evoRes = await fetch(speciesData.evolution_chain.url);
        const evoData = await evoRes.json();
        const evoChain = [];
        let evo = evoData.chain;
        while (evo) {
          evoChain.push(evo.species.name);
          evo = evo.evolves_to[0];
        }
        setEvolution(evoChain);
      } catch (err) {
        console.error("Error fetching Pokémon details:", err);
      }
    };

    fetchPokemon();
  }, [id]);

  useEffect(() => {
    if (pokemon) {
      const existing = customInfo[pokemon.name] || {};
      setNickname(existing.nickname || "");
      setComment(existing.comment || "");
    }
  }, [pokemon, customInfo]);

  if (!pokemon) return <p className="loading">Loading...</p>;

  const isFavourite = favourites.some((fav) => fav.name === pokemon.name);

  const flavorText = species?.flavor_text_entries.find(
    (entry) => entry.language.name === "en"
  )?.flavor_text.replace(/\f/g, " ");

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCustomInfo(pokemon.name, { nickname, comment });
    alert("Saved!");
  };

  // --- Select correct image (animated GIF if exists, else official artwork) ---
  const getMainImage = () => {
    if (!pokemon) return "";
    if (showShiny) {
      return (
        pokemon.sprites.versions["generation-v"]?.["black-white"]?.animated?.front_shiny ||
        pokemon.sprites.other["official-artwork"].front_shiny
      );
    } else {
      return (
        pokemon.sprites.versions["generation-v"]?.["black-white"]?.animated?.front_default ||
        pokemon.sprites.other["official-artwork"].front_default
      );
    }
  };

  return (
    <div className="detail-page">
      <div className="detail-content">
        {/* Left: Image + Buttons */}
        <div className="detail-left">
          <h1 className="title">
            #{pokemon.id} {pokemon.name.toUpperCase()}
          </h1>

          <img
            src={getMainImage()}
            alt={pokemon.name}
            className="pokemon-img"
          />

          <div className="types">
            {pokemon.types.map((t) => (
              <span key={t.type.name} className={`type-badge ${t.type.name}`}>
                {t.type.name}
              </span>
            ))}
          </div>

          <div className="btn-group">
            <button className="shiny-btn" onClick={() => setShowShiny(!showShiny)}>
              {showShiny ? "✨ Normal" : "🌟 Shiny"}
            </button>

            <button
              className={`fav-btn ${isFavourite ? "remove" : "add"}`}
              onClick={() =>
                isFavourite
                  ? removeFavourite(pokemon.name)
                  : addFavourite({
                      name: pokemon.name,
                      imageUrl: pokemon.sprites.other["official-artwork"].front_default,
                    })
              }
            >
              {isFavourite ? "★ Remove Favourite" : "☆ Add Favourite"}
            </button>
          </div>

          {/* ✏️ Nickname + Comment form */}
          <form className="edit-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <textarea
              placeholder="Comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit" className="save-btn">
              Save Info
            </button>
          </form>
        </div>

        {/* Right: Info */}
        <div className="detail-info">
          {/* Basic Info */}
          <div className="info-section">
            <h2>Basic Info</h2>
            <p>Height: {pokemon.height / 10} m</p>
            <p>Weight: {pokemon.weight / 10} kg</p>
            <p>Base EXP: {pokemon.base_experience}</p>
            {nickname && <p>Nickname: <strong>{nickname}</strong></p>}
            {comment && <p>Comment: {comment}</p>}
          </div>

          {/* Abilities */}
          <div className="info-section">
            <h2>Abilities</h2>
            <ul>
              {pokemon.abilities.map((a) => (
                <li key={a.ability.name}>
                  {a.ability.name}
                  {a.is_hidden && <span className="hidden">(Hidden)</span>}
                </li>
              ))}
            </ul>
          </div>

          {/* Stats */}
          <div className="info-section">
            <h2>Base Stats</h2>
            <ul className="stats-list">
              {pokemon.stats.map((s) => (
                <li key={s.stat.name}>
                  <span className="stat-name">{s.stat.name}</span>
                  <span className="stat-bar">
                    <div
                      className="bar-fill"
                      style={{ width: `${(s.base_stat / 255) * 100}%` }}
                    ></div>
                  </span>
                  <span className="stat-value">{s.base_stat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pokédex Entry */}
          {flavorText && (
            <div className="info-section">
              <h2>Pokédex Entry</h2>
              <p>{flavorText}</p>
            </div>
          )}

          {/* Evolution Chain */}
          {evolution.length > 1 && (
            <div className="info-section">
              <h2>Evolution Chain</h2>
              <div className="evolution-chain">
                {evolution.map((name) => (
                  <div key={name} className="evo-card">
                    <img
                      src={`https://img.pokemondb.net/artwork/${name}.jpg`}
                      alt={name}
                    />
                    <p>{name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detail;
