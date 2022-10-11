import { shallowMount } from "@vue/test-utils";
import BaseToast from "./BaseToast.vue";
import { toastStore, Toast } from "../store/toast.module";

jest.mock("../store/toast.module");

describe("BaseToast.vue", () => {
  it("renders the component", () => {
    const wrapper = shallowMount(BaseToast);
    expect(wrapper.exists()).toBe(true);
  });

  it("renders the toast message", () => {
    const toast: Toast = { message: "test", type: "success" };
    toastStore.toast = [toast];

    const wrapper = shallowMount(BaseToast);
    const message = wrapper.find(".toast__content p");

    expect(message.text()).toBe(toast.message);
  });

  it("renders the correct icon for success type", () => {
    const toast: Toast = { message: "test", type: "success" };
    toastStore.toast = [toast];

    const wrapper = shallowMount(BaseToast);
    const type = wrapper.find(".toast__icon i");

    expect(type.classes()).toContain("fa-check");
  });

  it("renders the correct icon for error type", () => {
    const toast: Toast = { message: "test", type: "error" };
    toastStore.toast = [toast];

    const wrapper = shallowMount(BaseToast);
    const type = wrapper.find(".toast__icon i");

    expect(type.classes()).toContain("fa-times");
  });

  it("renders the correct icon for info type", () => {
    const toast: Toast = { message: "test", type: "info" };
    toastStore.toast = [toast];

    const wrapper = shallowMount(BaseToast);
    const type = wrapper.find(".toast__icon i");

    expect(type.classes()).toContain("fa-info");
  });
});
