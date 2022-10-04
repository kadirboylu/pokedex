import { store } from "./index";
import { getModule, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { AuthResponse, User } from "@/service";
import { toastStore } from "./toast.module";

@Module({ name: "auth-module", dynamic: true, store, namespaced: true })
class AuthModule extends VuexModule {
  jwt = "";
  user: User | null = JSON.parse(sessionStorage.getItem("user") as string) || null;
  isLogin = JSON.parse(sessionStorage.getItem("user") as string) ? true : false;

  @Mutation
  login(data: AuthResponse): void {
    this.jwt = data.jwt;
    this.user = data.user;
    this.isLogin = true;

    sessionStorage.setItem("jwt", data.jwt);
    sessionStorage.setItem("user", JSON.stringify(data.user));
  }

  @Mutation
  logout(): void {
    this.jwt = "";
    this.user = null;
    this.isLogin = false;

    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("user");

    toastStore.createToast({ message: "You have been logged out", type: "info" });
  }
}

export const authStore = getModule(AuthModule);
