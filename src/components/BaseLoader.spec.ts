import { shallowMount } from "@vue/test-utils";
import BaseLoader from "./BaseLoader.vue";

describe("BaseLoader.vue", () => {
  it("renders the component", () => {
    const wrapper = shallowMount(BaseLoader);
    expect(wrapper.exists()).toBe(true);
  });
});
