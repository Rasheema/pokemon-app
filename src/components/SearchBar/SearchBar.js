// src/components/SearchBar/SearchBar.js
import React, { useEffect, useState } from "react";
import usePokemonStore from "../../zustand/useStore";
import "./SearchBar.css";

const SearchBar = () => {
  const { searchQuery, setSearchQuery, setSearchResults } = usePokemonStore();
  const [allNames, setAllNames] = useState([]);

  //  Fetch all Pokémon names once
  useEffect(() => {
    const fetchAllNames = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
        const data = await res.json();
        setAllNames(data.results); // contains { name, url }
      } catch (err) {
        console.error("Error fetching all Pokémon names:", err);
      }
    };

    fetchAllNames();
  }, []);

  //  Filter names only (no detail fetch)
  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
      return;
    }

    const matches = allNames.filter((p) =>
      p.name.includes(searchQuery.toLowerCase())
    );

    setSearchResults(matches.slice(0, 6)); // limit to 6 results
  }, [searchQuery, allNames, setSearchResults]);

  return (
    <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="Search Pokémon"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
      />
    </form>
  );
};

export default SearchBar;
