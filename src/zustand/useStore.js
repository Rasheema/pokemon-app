// src/zustand/useStore.js

// Import Zustand (state management library)
// `create` is for creating a store (global state for the whole app)
// `persist` is a middleware that saves part of the state into localStorage 
// so data remains after page refresh
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Create a global store to manage Pokémon data
// Zustand is chosen because it is lighter and simpler than Redux or React Context
const usePokemonStore = create(
  persist(
    (set) => ({
      // ------------------- POKÉMON LIST -------------------
      // Stores all Pokémon fetched from the API
      // Not persisted because it can always be fetched again
      pokemonList: [],
      setPokemonList: (list) => set({ pokemonList: list }),

      // ------------------- SEARCH -------------------
      // Stores the text entered in the search bar
      searchQuery: "",
      setSearchQuery: (query) => set({ searchQuery: query }),

      // Stores Pokémon that match the search
      searchResults: [],
      setSearchResults: (results) => set({ searchResults: results }),

      // ------------------- PAGINATION -------------------
      // Tracks the current page number
      // Not persisted to ensure reset to page 1 on refresh
      currentPage: 1,
      setCurrentPage: (page) => set({ currentPage: page }),

      // ------------------- FILTER (by type) -------------------
      // Example: filter only "fire" type Pokémon
      selectedType: null, // null means no filter is applied
      setSelectedType: (type) => set({ selectedType: type }),

      // Reset filter → clears the selected type and resets page back to 1
      clearFilter: () => set({ selectedType: null, currentPage: 1 }),

      // ------------------- FAVOURITES -------------------
      // Stores Pokémon marked as favourites (persisted in localStorage)
      favourites: [],
      addFavourite: (pokemon) =>
        set((state) => {
          // Prevent duplicates by checking if Pokémon already exists
          if (state.favourites.some((fav) => fav.name === pokemon.name)) return state;
          return { favourites: [...state.favourites, pokemon] };
        }),
      removeFavourite: (name) =>
        set((state) => ({
          favourites: state.favourites.filter((fav) => fav.name !== name),
        })),

      // ------------------- CUSTOM INFO -------------------
      // Custom notes/info for a specific Pokémon
      // Example: "Pikachu → caught in forest"
      customInfo: {},
      updateCustomInfo: (name, info) =>
        set((state) => ({
          customInfo: {
            ...state.customInfo, // keep existing info
            [name]: { ...state.customInfo[name], ...info }, // merge new info
          },
        })),
    }),

    // ------------------- PERSIST CONFIG -------------------
    {
      // localStorage key (where the data is saved)
      name: "pokemon-store",

      // Only favourites and customInfo are persisted
      // Search, filters, and pagination are excluded
      partialize: (state) => ({
        favourites: state.favourites,
        customInfo: state.customInfo,
      }),
    }
  )
);

// Export store so it can be used in components
export default usePokemonStore;
