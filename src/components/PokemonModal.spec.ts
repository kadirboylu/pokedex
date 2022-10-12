import { shallowMount, Wrapper, createLocalVue } from "@vue/test-utils";
import PokemonDrawer from "./PokemonDrawer.vue";
import { pokemonStore } from "@/store/pokemon.module";
import VueI18n from "vue-i18n";
import i18n from "@/i18n";
import { pikachu } from "@/mocks/pokemon";

jest.mock("@/store/pokemon.module");

const localVue = createLocalVue();
localVue.use(VueI18n);

const setup = (): Wrapper<PokemonDrawer> => {
  return shallowMount(PokemonDrawer, {
    localVue,
    i18n,
  });
};

describe("PokemonDrawer.vue", () => {
  beforeEach(() => {
    pokemonStore.pokemonData = pikachu;
    pokemonStore.showModal = true;
  });

  it("renders the component", () => {
    const wrapper = setup();
    expect(wrapper.exists()).toBe(true);
  });

  it("renders the correct pokemon image", () => {
    const wrapper = setup();
    expect(wrapper.find(".poke-img").attributes("src")).toBe(pikachu.sprites.other.home.front_default);
  });

  it("renders the correct pokemon name", () => {
    const wrapper = setup();
    expect(wrapper.find(".poke-name").text()).toBe(pikachu.name);
  });

  it("renders the correct pokemon height", () => {
    const wrapper = setup();
    expect(wrapper.find(".height").text()).toBe(`Height: ${pikachu.height} Decimetres`);
  });

  it("renders the correct pokemon weight", () => {
    const wrapper = setup();
    expect(wrapper.find(".weight").text()).toBe(`Weight: ${pikachu.weight} Hectograms`);
  });

  it("renders the correct types", () => {
    const wrapper = setup();
    expect(wrapper.findAll(".types").length).toBe(pikachu.types.length);
  });

  it("renders the correct abilities", () => {
    const wrapper = setup();
    expect(wrapper.findAll(".abilities").length).toBe(pikachu.abilities.length);
  });

  it("renders the correct moves", () => {
    const wrapper = setup();
    expect(wrapper.findAll(".moves").length).toBe(pikachu.moves.length);
  });
});
