export interface Abilities {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface Types {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface Moves {
  move: {
    name: string;
    url: string;
  };
}

export interface PokemonList {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string;
  previous: string | null;
  results: PokemonList[];
}

export interface PokemonResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  abilities: Abilities[];
  types: Types[];
  moves: Moves[];
  sprites: {
    other: {
      home: {
        front_default: string;
      };
    };
  };
}

export interface User {
  blocked: boolean;
  confirmed: boolean;
  createdAt: string;
  email: string;
  id: number;
  provider: string;
  updatedAt: string;
  username: string;
}

export interface AuthResponse {
  jwt: string;
  user: User;
}
