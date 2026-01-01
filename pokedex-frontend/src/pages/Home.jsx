import { useEffect, useState } from "react";
import { fetchPokemonList, fetchPokemonDetail } from "../api/PokemonApi";
import Header from "../components/Header";
import Loader from "../components/Loader";
import PokemonCard from "../components/PokemonCard";

export default function Home() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const fetchPokemon = async () => {
    try {
      setLoading(true);
      const data = await fetchPokemonList(150, 0);
      
      // Handle different response formats
      const pokemonList = data.results || data;
      
      // Fetch details for each Pokemon
      const detailedPokemonData = pokemonList.map(async (curPokemon) => {
        const name = curPokemon.name || curPokemon.id;
        return await fetchPokemonDetail(name);
      });

      const detailedResponses = await Promise.all(detailedPokemonData);
      console.log("Loaded Pokemon:", detailedResponses);
      setPokemon(detailedResponses);
      setLoading(false);
    } catch (err) {
      console.error("Error:", err);
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  // Search functionality
  const searchData = pokemon.filter((curPokemon) =>
    curPokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4 py-8">
          <Loader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-red-500 mb-2">Error!</p>
          <p className="text-slate-600 dark:text-slate-400">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        
        <Header search={search} setSearch={setSearch} />

        {/* Pokemon Grid */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {searchData.map((curPokemon) => (
            <PokemonCard key={curPokemon.id} pokemonData={curPokemon} />
          ))}
        </ul>

        {/* No results */}
        {searchData.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-slate-500 dark:text-slate-400">
              No Pokémon found. Try a different search!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}