import axios from "axios";
import { PokemonListResponse, PokemonResponse } from "./types";

const baseURL = "https://pokeapi.co/api/v2/pokemon/";

export const getPokemonList = async (): Promise<PokemonListResponse> => {
  const res = await axios.get<PokemonListResponse>(`${baseURL}?offset=0&limit=50`);

  return res.data;
};

export const getPokemon = async (name: string): Promise<PokemonResponse> => {
  const res = await axios.get<PokemonResponse>(`${baseURL}${name}`);

  return res.data;
};
