import { getPokemon, getPokemonList, loginUser, registerUser, updateUserById } from "./service";
import { mockUser } from "@/mocks/strapi";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

mockedAxios.get.mockResolvedValue({ data: {} });
mockedAxios.post.mockResolvedValue({ data: {} });
mockedAxios.put.mockResolvedValue({ data: {} });

const pokemonURL = "https://pokeapi.co/api/v2/pokemon/";
const strapiURL = "https://pokedex-backend-zjs6b.ondigitalocean.app/api/";

describe("service", () => {
  it("should call the pokemon api url", async () => {
    await getPokemonList();

    expect(mockedAxios.get).toHaveBeenCalledWith(`${pokemonURL}?offset=0&limit=100`);
  });

  it("should call the pokemon api url with the correct name", async () => {
    await getPokemon("pikachu");

    expect(mockedAxios.get).toHaveBeenCalledWith(`${pokemonURL}${"pikachu"}`);
  });

  it("should login the user", async () => {
    const email = "johndoe@example.com";
    const password = "JohnDoe1.";

    await loginUser(email, password);

    expect(mockedAxios.post).toHaveBeenCalledWith(`${strapiURL}auth/local`, { identifier: email, password });
  });

  it("should register the user", async () => {
    const username = mockUser.username;
    const email = mockUser.email;
    const password = "JohnDoe1.";
    const groups = mockUser.groups;
    const favorites = mockUser.favorites;
    const profilePicture = mockUser.profilePicture;

    await registerUser(username, email, password, groups, favorites, profilePicture);

    expect(mockedAxios.post).toHaveBeenCalledWith(`${strapiURL}auth/local/register`, {
      username,
      email,
      password,
      groups,
      favorites,
      profilePicture,
    });
  });

  it("should update the user", async () => {
    const id = 1;
    const jwt = "jwt";
    const data = mockUser;

    await updateUserById(id, jwt, data);

    expect(mockedAxios.put).toHaveBeenCalledWith(`${strapiURL}users/${id}`, data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  });
});
