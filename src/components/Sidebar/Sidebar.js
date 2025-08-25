import React from "react";
import usePokemonStore from "../../zustand/useStore";
import "./Sidebar.css";

const TYPES = [
  "normal", "fire", "water", "electric", "grass", "ice",
  "fighting", "poison", "ground", "flying", "psychic", "bug",
  "rock", "ghost", "dragon", "dark", "steel", "fairy"
];

const Sidebar = () => {
  const { selectedType, setSelectedType } = usePokemonStore();

  return (
    <div className="sidebar">
      <h3 className="sidebar-title">Types</h3>
      <ul>
        {TYPES.map((type) => (
          <li
            key={type}
            className={selectedType === type ? "active" : ""}
            onClick={() => setSelectedType(type)}
          >
            {type}
          </li>
        ))}
        <li
          className={!selectedType ? "active" : ""}
          onClick={() => setSelectedType(null)}
        >
          All
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
