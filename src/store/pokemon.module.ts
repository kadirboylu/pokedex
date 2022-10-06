import { store } from "./index";
import { getModule, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { PokemonResponse } from "@/service";

@Module({ name: "modal-module", dynamic: true, store, namespaced: true })
class PokemonModule extends VuexModule {
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
}

export const pokemonStore = getModule(PokemonModule);
