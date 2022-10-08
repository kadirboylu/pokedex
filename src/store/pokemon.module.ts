import { store } from "./index";
import { getModule, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { PokemonResponse } from "@/service";

@Module({ name: "modal-module", dynamic: true, store, namespaced: true })
class PokemonModule extends VuexModule {
  pokemonList: PokemonResponse[] = [];
  pokemonData: PokemonResponse = {
    name: "",
    id: 0,
    height: 0,
    weight: 0,
    base_experience: 0,
    abilities: [],
    types: [],
    moves: [],
    sprites: {
      other: {
        home: {
          front_default: "",
        },
      },
    },
  };
  showModal = false;
  showDrawer = false;
  showFilters = false;

  @Mutation
  openModal(data: PokemonResponse) {
    this.showModal = true;
    this.pokemonData = data;
  }

  @Mutation
  closeModal() {
    this.showModal = false;
  }

  @Mutation
  openDrawer(data: PokemonResponse) {
    this.showDrawer = true;
    this.pokemonData = data;
  }

  @Mutation
  closeDrawer() {
    this.showDrawer = false;
  }

  @Mutation
  openFilters() {
    this.showFilters = true;
  }

  @Mutation
  closeFilters() {
    this.showFilters = false;
  }

  @Mutation
  setPokemonList(data: PokemonResponse[]) {
    this.pokemonList = data;
  }
}

export const pokemonStore = getModule(PokemonModule);
