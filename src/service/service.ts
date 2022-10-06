import axios from "axios";
import { PokemonListResponse, PokemonResponse, AuthResponse, User } from "./types";

const pokemonURL = "https://pokeapi.co/api/v2/pokemon/";

const strapiURL = "https://pokedex-backend-zjs6b.ondigitalocean.app/api/";

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

export const registerUser = async (
  username: string,
  email: string,
  password: string,
  groups: [],
  favorites: [],
  profilePicture: string
): Promise<AuthResponse> => {
  const res = await axios.post(`${strapiURL}auth/local/register`, {
    username,
    email,
    password,
    groups,
    favorites,
    profilePicture,
  });

  return res.data;
};

export const getUser = async (jwt: string): Promise<AuthResponse> => {
  const res = await axios.get(`${strapiURL}users/me`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return res.data;
};

export const updateUserById = async (id: number, jwt: string, data: User): Promise<AuthResponse> => {
  const res = await axios.put(`${strapiURL}users/${id}`, data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  localStorage.setItem("user", JSON.stringify(res.data));
  return res.data;
};
