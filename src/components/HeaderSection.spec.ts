import { shallowMount, createLocalVue, Wrapper } from "@vue/test-utils";
import HeaderSection from "./HeaderSection.vue";
import { strapiStore } from "@/store/strapi.module";
import VueI18n from "vue-i18n";
import i18n from "@/i18n";
import { mockUser } from "@/mocks/strapi";
import { AuthResponse } from "@/service";
import flushPromises from "flush-promises";

jest.mock("@/store/strapi.module");

const localVue = createLocalVue();
localVue.use(VueI18n);

describe("HeaderSection.vue", () => {
  let wrapper: Wrapper<HeaderSection>;

  beforeEach(() => {
    wrapper = shallowMount(HeaderSection, {
      localVue,
      i18n,
    });
  });

  it("should render", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should render logo", () => {
    expect(wrapper.find(".header-logo").exists()).toBeTruthy();
  });

  it("should render home and favorites links", () => {
    const links = wrapper.findAll("nav a");

    expect(links.at(0).text()).toBe("Home");
    expect(links.at(1).text()).toBe("Favorites");
  });

  it("should render log in and sign up links when user is not logged in", () => {
    const links = wrapper.findAll("nav a");

    expect(links.at(2).text()).toBe("Log In");
    expect(links.at(3).text()).toBe("Sign Up");
  });
});

describe("HeaderSection.vue user logged in", () => {
  let wrapper: Wrapper<HeaderSection>;

  beforeEach(() => {
    strapiStore.login = jest.fn().mockImplementation((data: AuthResponse) => {
      strapiStore.jwt = data.jwt;
      strapiStore.user = data.user;
      strapiStore.isLogin = true;
    });

    strapiStore.login({ jwt: "jwt", user: mockUser });

    const mockRouter = {
      push: jest.fn(),
    };

    wrapper = shallowMount(HeaderSection, {
      localVue,
      i18n,
      mocks: {
        $router: mockRouter,
      },
    });
  });

  it("should render log out button and user details when user is logged in", () => {
    expect(wrapper.find(".logout").exists()).toBeTruthy();
    expect(wrapper.find(".user").exists()).toBeTruthy();
  });

  it("should render correct image and name", () => {
    expect(wrapper.find(".user img").attributes("src")).toBe(mockUser.profilePicture);
    expect(wrapper.find(".user .username").text()).toBe(mockUser.username);
  });

  it("should log out user when log out button is clicked", async () => {
    strapiStore.logout = jest.fn().mockImplementation(() => {
      strapiStore.jwt = "";
      strapiStore.user = null;
      strapiStore.isLogin = false;
      console.log("logout");
    });

    wrapper.find(".logout").trigger("click");

    await flushPromises();

    expect(strapiStore.logout).toHaveBeenCalled();
  });
});
