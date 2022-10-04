import axios from "axios";
import { PokemonListResponse, PokemonResponse, AuthResponse } from "./types";

const pokemonURL = "https://pokeapi.co/api/v2/pokemon/";

const strapiURL = "http://localhost:1337/api/";

export const getPokemonList = async (): Promise<PokemonListResponse> => {
  const res = await axios.get<PokemonListResponse>(`${pokemonURL}?offset=0&limit=50`);

  return res.data;
};

export const getPokemon = async (name: string): Promise<PokemonResponse> => {
  const res = await axios.get<PokemonResponse>(`${pokemonURL}${name}`);

  return res.data;
};

export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  const res = await axios.post(`${strapiURL}auth/local`, {
    identifier: email,
    password,
  });

  return res.data;
};

export const registerUser = async (username: string, email: string, password: string): Promise<AuthResponse> => {
  const res = await axios.post(`${strapiURL}auth/local/register`, {
    username,
    email,
    password,
  });

  return res.data;
};
