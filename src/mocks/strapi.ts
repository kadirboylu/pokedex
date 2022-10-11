import { AuthResponse, User } from "@/service";

export const mockUser: User = {
  id: 1,
  createdAt: "2021-07-01T12:00:00.000Z",
  updatedAt: "2021-07-01T12:00:00.000Z",
  blocked: false,
  confirmed: true,
  provider: "local",
  username: "johndoe",
  email: "johndoe@example.com",
  groups: ["electric", "fire"],
  favorites: [
    { name: "pikachu", group: "electric" },
    { name: "charmander", group: "fire" },
  ],
  profilePicture: "https://picsum.photos/200/200",
};

export const mockAuthResponse: AuthResponse = {
  jwt: "jwt",
  user: mockUser,
};
