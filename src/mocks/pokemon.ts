import { PokemonResponse } from "@/service";

export const pikachu: PokemonResponse = {
  id: 25,
  name: "pikachu",
  height: 4,
  weight: 60,
  base_experience: 112,
  abilities: [
    {
      ability: {
        name: "static",
        url: "https://pokeapi.co/api/v2/ability/9/",
      },
      is_hidden: false,
      slot: 1,
    },
    {
      ability: {
        name: "lightning-rod",
        url: "https://pokeapi.co/api/v2/ability/31/",
      },
      is_hidden: true,
      slot: 3,
    },
  ],
  types: [
    {
      slot: 1,
      type: {
        name: "electric",
        url: "https://pokeapi.co/api/v2/type/13/",
      },
    },
  ],
  moves: [
    {
      move: {
        name: "thunder-bolt",
        url: "https://pokeapi.co/api/v2/move/85/",
      },
    },
  ],
  sprites: {
    other: {
      home: {
        front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/25.png",
      },
    },
  },
};

export const charmander: PokemonResponse = {
  id: 4,
  name: "charmander",
  height: 6,
  weight: 85,
  base_experience: 62,
  abilities: [
    {
      ability: {
        name: "blaze",
        url: "https://pokeapi.co/api/v2/ability/66/",
      },
      is_hidden: false,
      slot: 1,
    },
    {
      ability: {
        name: "solar-power",
        url: "https://pokeapi.co/api/v2/ability/94/",
      },
      is_hidden: true,
      slot: 3,
    },
  ],
  types: [
    {
      slot: 1,
      type: {
        name: "fire",
        url: "https://pokeapi.co/api/v2/type/10/",
      },
    },
  ],
  moves: [
    {
      move: {
        name: "flame-burst",
        url: "https://pokeapi.co/api/v2/move/394/",
      },
    },
  ],
  sprites: {
    other: {
      home: {
        front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/4.png",
      },
    },
  },
};
