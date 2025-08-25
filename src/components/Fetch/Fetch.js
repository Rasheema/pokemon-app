// src/components/Fetch/Fetching.js
import React, { useEffect, useState } from "react";
import usePokemonStore from "../../zustand/useStore";
import PokemonCard from "../Card/Card";
import { ClipLoader } from "react-spinners";
import Pagination from "../Pagination/Pagination";

const ITEMS_PER_PAGE = 30;

const Fetching = () => {
  const {
    pokemonList,
    setPokemonList,
    searchResults,
    currentPage,
    selectedType,
  } = usePokemonStore();

  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const [detailedSearchResults, setDetailedSearchResults] = useState([]);
  const [typeTotal, setTypeTotal] = useState(0);

  // Fetch Pokémon for pagination OR filtered type
  useEffect(() => {
    const fetchPaginated = async () => {
      try {
        setDataIsLoaded(false);

        // If filtering by type
        if (selectedType) {
          const typeRes = await fetch(
            `https://pokeapi.co/api/v2/type/${selectedType}`
          );
          const typeData = await typeRes.json();

          const total = typeData.pokemon.length;
          setTypeTotal(total);

          const start = (currentPage - 1) * ITEMS_PER_PAGE;
          const end = start + ITEMS_PER_PAGE;
          const slice = typeData.pokemon.slice(start, end);

          const detailed = await Promise.all(
            slice.map(async (p) => {
              const res = await fetch(p.pokemon.url);
              return await res.json();
            })
          );

          const simplified = detailed.map((pokemon) => ({
            name: pokemon.name,
            imageUrl:
              pokemon.sprites.versions["generation-v"]?.["black-white"]
                ?.animated?.front_default || pokemon.sprites.front_default,
            types: pokemon.types.map((t) => t.type.name),
          }));

          setPokemonList(simplified);
          setDataIsLoaded(true);
          return;
        }

        // Normal Pokédex (global pagination)
        const offset = (currentPage - 1) * ITEMS_PER_PAGE;
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${ITEMS_PER_PAGE}`
        );
        const data = await res.json();

        const detailed = await Promise.all(
          data.results.map(async (pokemon) => {
            const r = await fetch(pokemon.url);
            return await r.json();
          })
        );

        const simplified = detailed.map((pokemon) => ({
          name: pokemon.name,
          imageUrl:
            pokemon.sprites.versions["generation-v"]?.["black-white"]
              ?.animated?.front_default || pokemon.sprites.front_default,
          types: pokemon.types.map((t) => t.type.name),
        }));

        setPokemonList(simplified);
        setDataIsLoaded(true);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    // Only fetch list when not searching
    if (searchResults.length === 0) {
      fetchPaginated();
    }
  }, [currentPage, selectedType, setPokemonList, searchResults]);

  // Fetch images for search results
  useEffect(() => {
    const fetchDetailsForSearch = async () => {
      if (searchResults.length === 0) {
        setDetailedSearchResults([]);
        return;
      }
      try {
        const detailed = await Promise.all(
          searchResults.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            const data = await res.json();
            return {
              name: data.name,
              imageUrl:
                data.sprites.versions["generation-v"]?.["black-white"]
                  ?.animated?.front_default || data.sprites.front_default,
              types: data.types.map((t) => t.type.name),
            };
          })
        );
        setDetailedSearchResults(detailed);
      } catch (error) {
        console.error("Error fetching search result details:", error);
      }
    };

    fetchDetailsForSearch();
  }, [searchResults]);

  // Loader
  if (!dataIsLoaded && searchResults.length === 0) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}
      >
        <ClipLoader />
      </div>
    );
  }

  // totalCount (normal vs type filter)
  const totalCount = selectedType ? typeTotal : 1010;

  return (
    <div className="fetching-wrapper py-4">
      <div className="container">
        <div className="row g-3">
          {/* If searching, show search results; else show list */}
          {detailedSearchResults.length > 0
            ? detailedSearchResults.map((pokemon, index) => (
                <div key={index} className="col-12 col-sm-6 col-md-4">
                  <PokemonCard
                    name={pokemon.name}
                    imageUrl={pokemon.imageUrl}
                    types={pokemon.types}
                  />
                </div>
              ))
            : pokemonList.map((pokemon, index) => (
                <div key={index} className="col-12 col-sm-6 col-md-4">
                  <PokemonCard
                    name={pokemon.name}
                    imageUrl={pokemon.imageUrl}
                    types={pokemon.types}
                  />
                </div>
              ))}
        </div>

        {/* Pagination only when not searching */}
        {searchResults.length === 0 && (
          <Pagination totalCount={totalCount} itemsPerPage={ITEMS_PER_PAGE} />
        )}
      </div>
    </div>
  );
};

export default Fetching;
