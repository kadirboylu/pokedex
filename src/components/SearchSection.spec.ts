import { shallowMount, createLocalVue, Wrapper } from "@vue/test-utils";
import SearchSection from "./SearchSection.vue";
import VueI18n from "vue-i18n";
import i18n from "@/i18n";
import { pokemonStore } from "@/store/pokemon.module";

jest.mock("@/store/pokemon.module");

const localVue = createLocalVue();
localVue.use(VueI18n);

describe("SearchSection.vue", () => {
  let wrapper: Wrapper<SearchSection>;
  beforeEach(() => {
    wrapper = shallowMount(SearchSection, {
      localVue,
      i18n,
    });
  });

  it("should render the component", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should render the search input", () => {
    expect(wrapper.find(".search").exists()).toBe(true);
  });

  it("should render the filter button", () => {
    expect(wrapper.find(".filter-button").exists()).toBe(true);
  });

  it("should call openFilters method when filter button is clicked", async () => {
    await wrapper.find(".filter-button").trigger("click");
    expect(pokemonStore.openFilters).toHaveBeenCalled();
  });

  it("sets the query when the input is changed", () => {
    jest.useFakeTimers();
    const input = wrapper.find("input");
    input.setValue("test");
    jest.advanceTimersByTime(1000);
    expect(wrapper.vm.$data.query).toBe("test");
    expect(wrapper.emitted().search).toBeTruthy();
  });
});
