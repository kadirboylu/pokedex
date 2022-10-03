import { store } from "./index";
import { getModule, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { PokemonResponse } from "@/service";

@Module({ name: "drawer-module", dynamic: true, store, namespaced: true })
class DrawerModule extends VuexModule {
  showDrawer = false;
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
  openDrawer(data: PokemonResponse): void {
    this.showDrawer = true;
    this.pokemonData = data;
  }

  @Mutation
  closeDrawer(): void {
    this.showDrawer = false;
  }
}

export const drawerStore = getModule(DrawerModule);
