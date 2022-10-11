import { shallowMount, createLocalVue, Wrapper } from "@vue/test-utils";
import FavoriteGroup from "./FavoriteGroup.vue";
import { getPokemon } from "@/service";
import { strapiStore } from "@/store/strapi.module";
import { pikachu } from "@/mocks/pokemon";
import { mockUser } from "@/mocks/strapi";
import VueI18n from "vue-i18n";
import flushPromises from "flush-promises";
import i18n from "@/i18n";

jest.mock("../service/service");
jest.mock("../store/strapi.module");

const localVue = createLocalVue();
localVue.use(VueI18n);

const setup = (): Wrapper<FavoriteGroup> => {
  return shallowMount(FavoriteGroup, {
    localVue,
    i18n,
    propsData: {
      group: "electric",
    },
  });
};

describe("Favorite Group Card", () => {
  let wrapper: Wrapper<FavoriteGroup>;

  beforeEach(async () => {
    strapiStore.user = mockUser;

    (getPokemon as jest.Mock).mockResolvedValue(pikachu);

    await flushPromises();

    wrapper = setup();
  });

  it("renders the component", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("renders the correct pokemon", () => {
    expect(wrapper.find("a p").text()).toBe("pikachu");
  });

  it("renders the correct pokemon image", () => {
    expect(wrapper.find("img").attributes("src")).toBe(pikachu.sprites.other.home.front_default);
  });

  it("removes the pokemon from the group", async () => {
    wrapper.find(".fa-times").trigger("click");

    await flushPromises();

    const empty = wrapper.find(".empty");

    expect(strapiStore.removeFromFavorites).toHaveBeenCalledWith({ name: "pikachu", group: "electric" });

    expect(empty.exists()).toBe(true);
  });
});

describe("Favorite Group errors", () => {
  it("renders the error message when the pokemon is not found", async () => {
    strapiStore.user = mockUser;

    (getPokemon as jest.Mock).mockImplementationOnce(() => {
      throw new Error("Not found");
    });

    await flushPromises();

    const wrapper = setup();

    expect(wrapper.find(".error").text()).toBe("Not found");
  });

  it("renders the empty message when there are no pokemons", async () => {
    strapiStore.user = {
      ...mockUser,
      favorites: [],
    };

    await flushPromises();

    const wrapper = setup();

    expect(wrapper.find(".empty").text()).toBe("Empty");
  });

  it("renders the base loader component", () => {
    strapiStore.user = mockUser;

    (getPokemon as jest.Mock).mockResolvedValue(pikachu);

    const wrapper = setup();

    expect(wrapper.find("baseloader-stub").exists()).toBe(true);
  });
});
