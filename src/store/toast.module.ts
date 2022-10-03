import { store } from "./index";
import { getModule, Module, Mutation, VuexModule } from "vuex-module-decorators";

interface Toast {
  message: string;
  type: "success" | "error" | "info";
}

@Module({ name: "toast-module", dynamic: true, store, namespaced: true })
class ToastModule extends VuexModule {
  toast: Toast[] = [];

  @Mutation
  createToast(toast: Toast) {
    this.toast.push(toast);

    setTimeout(() => {
      this.toast.shift();
    }, 3000);
  }
}

export const toastStore = getModule(ToastModule);
