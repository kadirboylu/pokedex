import { shallowMount } from "@vue/test-utils";
import LanguageSelection from "./LanguageSelection.vue";

describe("LanguageSelection.vue", () => {
  it("renders the component", () => {
    const wrapper = shallowMount(LanguageSelection);
    expect(wrapper).toBeTruthy();
  });

  it("should render select element", () => {
    const wrapper = shallowMount(LanguageSelection);
    expect(wrapper.find("select").exists()).toBe(true);
  });

  it("should render 2 options", () => {
    const wrapper = shallowMount(LanguageSelection);
    expect(wrapper.findAll("option").length).toBe(2);
  });

  it("should render 2 options with correct values", () => {
    const wrapper = shallowMount(LanguageSelection);
    const options = wrapper.findAll("option");
    expect(options.at(0).text()).toEqual("English");
    expect(options.at(1).text()).toEqual("Türkçe");
  });
});
