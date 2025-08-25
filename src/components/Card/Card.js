// src/components/Card/Card.js
import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

const PokemonCard = ({ name, imageUrl, types = [] }) => {
  return (
    <Link to={`/detail/${name}`} className="pokemon-card-link">
      <div className="pokemon-card">
        <img src={imageUrl} className="card-image-top" alt={name} />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <div className="card-types">
            {types.map((type, idx) => (
              <span key={idx} className={`type-badge type-${type}`}>
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;
