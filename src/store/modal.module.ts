import { store } from "./index";
import { getModule, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { PokemonResponse } from "@/service";

@Module({ name: "modal-module", dynamic: true, store, namespaced: true })
class ModalModule extends VuexModule {
  showModal = false;
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

  @Mutation
  openModal(data: PokemonResponse): void {
    this.showModal = true;
    this.pokemonData = data;
  }

  @Mutation
  closeModal(): void {
    this.showModal = false;
  }
}

export const modalStore = getModule(ModalModule);
