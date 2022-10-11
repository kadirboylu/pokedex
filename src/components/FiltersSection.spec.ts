import { shallowMount, createLocalVue, Wrapper } from "@vue/test-utils";
import FiltersSection from "./FiltersSection.vue";
import VueI18n from "vue-i18n";
import i18n from "@/i18n";
import { pokemonStore } from "@/store/pokemon.module";
import { pikachu, charmander } from "@/mocks/pokemon";
import flushPromises from "flush-promises";

jest.mock("@/store/pokemon.module");
jest.mock("@/store/toast.module");

const localVue = createLocalVue();
localVue.use(VueI18n);

const setup = (): Wrapper<FiltersSection> => {
  return shallowMount(FiltersSection, {
    localVue,
    i18n,
  });
};

describe("FiltersSection.vue", () => {
  let wrapper: Wrapper<FiltersSection>;

  beforeEach(() => {
    pokemonStore.pokemonList = [pikachu, charmander];

    wrapper = setup();
  });

  it("should render", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should call the closeFilters method when the close button is clicked", () => {
    wrapper.find(".fa-times").trigger("click");

    expect(pokemonStore.closeFilters).toHaveBeenCalled();
  });

  it("should update the minWeight and maxWeight values when the inputs are changed", async () => {
    wrapper.find("#minWeight").setValue(10);
    wrapper.find("#maxWeight").setValue(20);

    await flushPromises();
    expect(wrapper.vm.$data.minWeight).toBe(10);
    expect(wrapper.vm.$data.maxWeight).toBe(20);
  });

  it("should update the minHeight and maxHeight values when the inputs are changed", async () => {
    wrapper.find("#minHeight").setValue(10);
    wrapper.find("#maxHeight").setValue(20);

    await flushPromises();
    expect(wrapper.vm.$data.minHeight).toBe(10);
    expect(wrapper.vm.$data.maxHeight).toBe(20);
  });

  it("should update type value when type input value updated", async () => {
    wrapper.find("#filterType").setValue("fire");

    await flushPromises();
    expect(wrapper.vm.$data.type).toBe("fire");
  });

  it("should filter the pokemon list when the form is submitted", async () => {
    wrapper.find("#minWeight").setValue(60);
    wrapper.find("#maxWeight").setValue(90);
    wrapper.find("#minHeight").setValue(5);
    wrapper.find("#maxHeight").setValue(10);
    wrapper.find("#filterType").setValue("fire");
    wrapper.find("form").trigger("submit");

    await flushPromises();

    expect(wrapper.vm.$data.results).toEqual([charmander]);
    expect(wrapper.emitted("filter")).toBeTruthy();
  });

  it("shouldn't filter when minWeight is greater than maxWeight", async () => {
    wrapper.find("#minWeight").setValue(90);
    wrapper.find("#maxWeight").setValue(60);
    wrapper.find("form").trigger("submit");

    await flushPromises();

    expect(wrapper.vm.$data.isFiltered).toBe(false);
    expect(wrapper.vm.$data.results).toEqual([]);
  });

  it("shouldn't filter when minHeight is greater than maxHeight", async () => {
    wrapper.find("#minHeight").setValue(10);
    wrapper.find("#maxHeight").setValue(5);
    wrapper.find("form").trigger("submit");

    await flushPromises();

    expect(wrapper.vm.$data.isFiltered).toBe(false);
    expect(wrapper.vm.$data.results).toEqual([]);
  });
});
