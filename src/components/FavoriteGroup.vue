<template>
  <div>
    <BaseLoader v-if="loading" />
    <div v-if="pokemons[0]" class="wrapper">
      <div class="card" v-for="pokemon in pokemons" :key="pokemon.name">
        <a :href="`/pokemon/${pokemon.name}`" class="pokemon-info">
          <img :src="pokemon.sprites.other.home.front_default" alt="pokemon" />
          <p>{{ pokemon.name }}</p>
        </a>
        <i class="fas fa-times" @click="remove(pokemon.name)"></i>
      </div>
    </div>
    <p class="empty" v-if="!pokemons[0]">EMPTY</p>
    <p class="error" v-if="error">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { authStore } from "@/store/auth.module";
import { getPokemon, PokemonResponse } from "@/service";
import BaseLoader from "./BaseLoader.vue";

@Component({
  components: {
    BaseLoader,
  },
})
export default class FavoriteGroup extends Vue {
  @Prop({ required: true }) group!: string;

  pokemons: PokemonResponse[] = [];
  error = "";
  loading = false;

  async created() {
    try {
      this.loading = true;
      if (authStore.user) {
        const { favorites } = authStore.user;
        const pokemonList = favorites.filter((pokemon) => pokemon.group === this.group);

        this.pokemons = await Promise.all(pokemonList.map((pokemon) => getPokemon(pokemon.name)));
      }
    } catch (error) {
      this.error = (error as Error).message;
    } finally {
      this.loading = false;
    }
  }

  remove(name: string) {
    this.pokemons = this.pokemons.filter((pokemon) => pokemon.name !== name);
    authStore.removeFromFavorites({ name, group: this.group });
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;

  .card {
    position: relative;
    width: 320px;
    margin: 0.5rem;
    padding: 0.5rem;
    background-image: linear-gradient(to right, var(--card-color-from), var(--card-color-to));
    color: whitesmoke;
    display: flex;
    align-items: center;
    justify-content: space-between;
    user-select: none;
    border-radius: 10px;
    transition: all 0.5s ease-in-out;

    &:hover {
      cursor: pointer;
      transform: scale(1.05);
    }

    .pokemon-info {
      display: flex;
      align-items: center;
      justify-content: center;

      p {
        font-family: "Sigmar One", cursive;
        font-weight: 500;
        text-transform: uppercase;
        font-size: 14px;
        margin-left: 1rem;
      }

      img {
        height: 100px;
      }
    }
  }

  .fa-times {
    position: absolute;
    right: 10px;
    font-size: 1.5rem;
    cursor: pointer;
    margin-right: 0.5rem;
  }
}

.error {
  min-height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  font-size: 1.5rem;
  font-weight: 500;
}

.empty {
  min-height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  font-family: "Sigmar One", cursive;
  font-size: 1.5rem;
  font-weight: 500;
  opacity: 0.5;
}
</style>
