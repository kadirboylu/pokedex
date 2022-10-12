import { shallowMount, createLocalVue, Wrapper } from "@vue/test-utils";
import FooterSection from "./FooterSection.vue";
import VueI18n from "vue-i18n";
import i18n from "@/i18n";

const localVue = createLocalVue();
localVue.use(VueI18n);

describe("Footer Section", () => {
  let wrapper: Wrapper<FooterSection>;

  beforeEach(() => {
    wrapper = shallowMount(FooterSection, {
      localVue,
      i18n,
    });
  });

  it("renders the component", () => {
    expect(wrapper.exists()).toBe(true);
  });
  it("renders two links", () => {
    expect(wrapper.findAll("a")).toHaveLength(2);
  });

  it("renders the correct links", () => {
    expect(wrapper.findAll("a").at(0).html()).toBe(
      '<a href="https://github.com/kadirboylu/pokedex" target="_blank"><i class="fa-brands fa-github"></i></a>'
    );
    expect(wrapper.findAll("a").at(1).text()).toBe("KADİR BOYLU");
  });
});
