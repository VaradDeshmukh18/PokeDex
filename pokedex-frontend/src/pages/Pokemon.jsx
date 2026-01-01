import { useEffect, useState } from "react";
import { fetchPokemonList, fetchPokemonDetail } from "../api/PokemonApi";
import { PokemonCard } from "../components/PokemonCard";

export const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [searchedPokemon, setSearchedPokemon] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [cache, setCache] = useState(new Map());
  
  const POKEMON_PER_PAGE = 20;

  const fetchPokemon = async (page = 1) => {
    const offset = (page - 1) * POKEMON_PER_PAGE;
    const cacheKey = `page_${page}`;

    // Check cache first
    if (cache.has(cacheKey)) {
      console.log("Loading from cache:", cacheKey);
      setPokemon(cache.get(cacheKey));
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await fetchPokemonList(POKEMON_PER_PAGE, offset);
      
      const pokemonList = data.results || data;

      const detailedPokemonData = pokemonList.map(async (curPokemon) => {
        const name = curPokemon.name || curPokemon.id;
        
        // Check if pokemon is already cached
        const pokemonCacheKey = `pokemon_${name}`;
        if (cache.has(pokemonCacheKey)) {
          return cache.get(pokemonCacheKey);
        }
        
        const res = await fetchPokemonDetail(name);
        
        // Cache individual pokemon
        setCache(prev => new Map(prev).set(pokemonCacheKey, res));
        
        return res;
      });

      const detailedResponses = await Promise.all(detailedPokemonData);
      console.log("Loaded Pokemon:", detailedResponses);
      
      // Cache the entire page
      setCache(prev => new Map(prev).set(cacheKey, detailedResponses));
      
      setPokemon(detailedResponses);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchPokemon(currentPage);
  }, [currentPage]);

  // Search functionality with cache
  const handleSearch = async (searchTerm) => {
    setSearch(searchTerm);
    setSearchedPokemon(null);

    if (!searchTerm.trim()) {
      return;
    }

    // First, check if pokemon exists in loaded list
    const foundInList = pokemon.find((p) =>
      p.name.toLowerCase() === searchTerm.toLowerCase().trim()
    );

    if (foundInList) {
      return;
    }

    // Check cache for searched pokemon
    const pokemonCacheKey = `pokemon_${searchTerm.toLowerCase().trim()}`;
    if (cache.has(pokemonCacheKey)) {
      console.log("Loading searched pokemon from cache");
      setSearchedPokemon(cache.get(pokemonCacheKey));
      return;
    }

    // If not in cache, fetch from API
    setSearchLoading(true);
    try {
      const fetchedPokemon = await fetchPokemonDetail(searchTerm.toLowerCase().trim());
      
      // Cache the searched pokemon
      setCache(prev => new Map(prev).set(pokemonCacheKey, fetchedPokemon));
      
      setSearchedPokemon(fetchedPokemon);
      setSearchLoading(false);
    } catch (err) {
      console.log("Pokemon not found:", err);
      setSearchLoading(false);
    }
  };

  // Filter loaded pokemon + add searched pokemon if exists
  const getDisplayPokemon = () => {
    const filteredPokemon = pokemon.filter((curPokemon) =>
      curPokemon.name.toLowerCase().includes(search.toLowerCase())
    );

    // If we have a searched pokemon that's not in the list, add it
    if (searchedPokemon && !filteredPokemon.find(p => p.id === searchedPokemon.id)) {
      return [searchedPokemon];
    }

    return filteredPokemon;
  };

  const displayPokemon = getDisplayPokemon();

  const handleNextPage = () => {
    setCurrentPage(prev => prev + 1);
    setSearch("");
    setSearchedPokemon(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      setSearch("");
      setSearchedPokemon(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <h1>Loading....</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h1>{error.message}</h1>
      </div>
    );
  }

  return (
    <>
      <section className="container">
        <header>
          <h1>Let's Catch Pokémon</h1>
        </header>
        <div className="pokemon-search">
          <input
            type="text"
            placeholder="search Pokemon by name or ID"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {searchLoading && <p className="search-loading">Searching...</p>}
        </div>

        <div>
          {displayPokemon.length === 0 && search && !searchLoading && (
            <div className="no-results">
              <h2>No Pokémon found with name "{search}"</h2>
              <p>Try searching by exact name or ID (e.g., "pikachu" or "25")</p>
            </div>
          )}
          <ul className="cards">
            {displayPokemon.map((curPokemon) => {
              return (
                <PokemonCard key={curPokemon.id} pokemonData={curPokemon} />
              );
            })}
          </ul>
        </div>

        {/* Pagination Controls - Only show when not searching */}
        {!search && (
          <div className="pagination-controls">
            <button 
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              ← Previous
            </button>
            <span className="page-number">Page {currentPage}</span>
            <button 
              onClick={handleNextPage}
              className="pagination-btn"
            >
              Next →
            </button>
          </div>
        )}
      </section>
    </>
  );
};