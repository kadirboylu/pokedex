import { PokemonResponse } from "@/service";

export const pikachu: PokemonResponse = {
  id: 25,
  name: "pikachu",
  height: 4,
  weight: 60,
  base_experience: 112,
  abilities: [],
  types: [],
  moves: [],
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
  abilities: [],
  types: [],
  moves: [],
  sprites: {
    other: {
      home: {
        front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/4.png",
      },
    },
  },
};
