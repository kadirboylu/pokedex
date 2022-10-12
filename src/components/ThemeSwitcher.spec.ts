import { shallowMount, Wrapper, createLocalVue } from "@vue/test-utils";
import ThemeSwitcher from "@/components/ThemeSwitcher.vue";
import VueI18n from "vue-i18n";
import i18n from "@/i18n";

const localVue = createLocalVue();
localVue.use(VueI18n);

const localStorageMock = (function () {
  interface ILocalStorage {
    [key: string]: string;
  }

  const store = {} as ILocalStorage;

  return {
    getItem(key: string) {
      return store[key];
    },

    setItem(key: string, value: string) {
      store[key] = value;
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

const setLocalStorage = (id: string, data: string) => {
  window.localStorage.setItem(id, data);
};

const setup = (): Wrapper<ThemeSwitcher> => {
  return shallowMount(ThemeSwitcher, {
    localVue,
    i18n,
  });
};

describe("ThemeSwitcher.vue", () => {
  it("renders the component", () => {
    const wrapper = setup();
    expect(wrapper.find(".theme-switcher").exists()).toBe(true);
  });

  it("changes the theme to dark when the switch is clicked", async () => {
    setLocalStorage("theme", "light");
    const wrapper = setup();

    await wrapper.find(".theme-switcher").trigger("click");

    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("changes the theme to light when the switch is clicked", async () => {
    setLocalStorage("theme", "dark");
    const wrapper = setup();

    await wrapper.find(".theme-switcher").trigger("click");

    expect(localStorage.getItem("theme")).toBe("light");
  });
});
