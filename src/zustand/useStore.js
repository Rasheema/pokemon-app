// src/zustand/useStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const usePokemonStore = create(
  persist(
    (set) => ({
      // Pokémon list (not persisted)
      pokemonList: [],
      setPokemonList: (list) => set({ pokemonList: list }),

      // Search
      searchQuery: "",
      setSearchQuery: (query) => set({ searchQuery: query }),
      searchResults: [],
      setSearchResults: (results) => set({ searchResults: results }),

      // Pagination (NOT persisted)
      currentPage: 1,
      setCurrentPage: (page) => set({ currentPage: page }),

      // Pokémon type filter
      selectedType: null, // null = no filter
      setSelectedType: (type) => set({ selectedType: type }),
      clearFilter: () => set({ selectedType: null, currentPage: 1 }),


      // Favourites (persisted)
      favourites: [],
      addFavourite: (pokemon) =>
        set((state) => {
          if (state.favourites.some((fav) => fav.name === pokemon.name)) return state;
          return { favourites: [...state.favourites, pokemon] };
        }),
      removeFavourite: (name) =>
        set((state) => ({
          favourites: state.favourites.filter((fav) => fav.name !== name),
        })),

      // Custom info (persisted)
      customInfo: {},
      updateCustomInfo: (name, info) =>
        set((state) => ({
          customInfo: {
            ...state.customInfo,
            [name]: { ...state.customInfo[name], ...info },
          },
        })),
    }),
    {
      name: "pokemon-store", // localStorage key
      partialize: (state) => ({
        favourites: state.favourites,
        customInfo: state.customInfo,
      }),
    }
  )
);

export default usePokemonStore;
