import React from "react";
import usePokemonStore from "../../zustand/useStore";
import "./Filter.css";

const Filter = () => {
  const { selectedType, setSelectedType, clearFilter } = usePokemonStore();

  const types = [
    "normal", "fire", "water", "grass", "electric",
    "ice", "fighting", "poison", "ground", "flying",
    "psychic", "bug", "rock", "ghost", "dark",
    "dragon", "steel", "fairy"
  ];

  return (
    <div className="filter-bar">
      <h5>Filter by Type</h5>
      <div className="filter-types">
        {types.map((type) => (
          <button
            key={type}
            className={`filter-btn ${type} ${selectedType === type ? "active" : ""}`}
            onClick={() => setSelectedType(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {selectedType && (
        <div>
          <button className="clear-btn" onClick={clearFilter}>
            Clear Filter
          </button>
        </div>
      )}
    </div>
  );
};

export default Filter;
