// src/pages/Favourite/Favourite.js
import React from "react";
import usePokemonStore from "../../zustand/useStore";
import PokemonCard from "../../components/Card/Card";
import "./Favourite.css";

const Favourite = () => {
  const { favourites } = usePokemonStore();

  return (
    <div className="favourite-page">
      <h1 className="fav-title"> Favourite Pokémon</h1>

      {favourites.length === 0 ? (
        <div className="empty-state">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
            alt="pikachu"
          />
          <p>No favourites yet... Go catch some!</p>
        </div>
      ) : (
        <div className="favourite-grid">
          {favourites.map((pokemon) => (
            <div className="fav-card-wrapper" key={pokemon.name}>
              <PokemonCard name={pokemon.name} imageUrl={pokemon.imageUrl} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourite;
