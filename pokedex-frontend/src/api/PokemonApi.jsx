const BASE = "http://localhost:8080/api/pokemon";

export const fetchPokemonList = async (limit, offset) => {
  const res = await fetch(`${BASE}?limit=${limit}&offset=${offset}`);
  return res.json();
};

export const fetchPokemonDetail = async (nameOrId) => {
  const res = await fetch(`${BASE}/${nameOrId}`);
  if (!res.ok) {
    throw new Error("Pokemon not found");
  }
  return res.json();
};