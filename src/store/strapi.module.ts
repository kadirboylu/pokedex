import { store } from "./index";
import { getModule, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { AuthResponse, User, updateUserById, Favorites } from "@/service";
import { toastStore } from "./toast.module";

@Module({ name: "auth-module", dynamic: true, store, namespaced: true })
class StrapiModule extends VuexModule {
  jwt = "";
  user: User | null = JSON.parse(localStorage.getItem("user") as string) || null;
  isLogin = JSON.parse(localStorage.getItem("user") as string) ? true : false;

  @Mutation
  login(data: AuthResponse) {
    this.jwt = data.jwt;
    this.user = data.user;
    this.isLogin = true;

    localStorage.setItem("jwt", data.jwt);
    localStorage.setItem("user", JSON.stringify(data.user));
  }

  @Mutation
  logout() {
    this.jwt = "";
    this.user = null;
    this.isLogin = false;

    localStorage.removeItem("jwt");
    localStorage.removeItem("user");

    toastStore.createToast({ message: "You have been logged out", type: "info" });
  }

  @Mutation
  async addNewGroup(group: string) {
    if (this.user && !this.user?.groups.includes(group)) {
      this.user.groups.push(group);

      await updateUserById(this.user.id, this.jwt, this.user);

      toastStore.createToast({ message: "Group added", type: "success" });
    } else {
      toastStore.createToast({ message: "Group already exists", type: "error" });
    }
  }

  @Mutation
  async removeGroup(group: string) {
    if (this.user && this.user?.groups.includes(group)) {
      this.user.groups = this.user.groups.filter((g) => g !== group);

      await updateUserById(this.user.id, this.jwt, this.user);

      toastStore.createToast({ message: "Group removed", type: "info" });
    }
  }

  @Mutation
  async addToFavorites(favorite: Favorites) {
    const findPokemon = this.user?.favorites.find((fav) => fav.name === favorite.name);

    if (this.user && !findPokemon) {
      this.user.favorites.push(favorite);

      await updateUserById(this.user.id, this.jwt, this.user);

      toastStore.createToast({ message: "Pokemon added to favorites", type: "success" });
    }
  }

  @Mutation
  async removeFromFavorites(favorite: Favorites) {
    const findPokemon = this.user?.favorites.find((fav) => fav.name === favorite.name);

    if (this.user && findPokemon) {
      this.user.favorites = this.user.favorites.filter((fav) => fav.name !== favorite.name);

      await updateUserById(this.user.id, this.jwt, this.user);

      toastStore.createToast({ message: "Pokemon removed from favorites", type: "info" });
    }
  }
}

export const strapiStore = getModule(StrapiModule);
