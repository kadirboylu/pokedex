<template>
  <div class="wrapper">
    <BaseLoader v-if="loading" />
    <TransitionGroup v-if="pokemons[0]" name="list" tag="main">
      <PokemonCard v-for="pokemon in pokemons" :key="pokemon.name" :pokemon="pokemon" />
    </TransitionGroup>
    <p class="empty" v-if="!pokemons[0]">EMPTY</p>
    <p class="error" v-if="error">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { authStore } from "@/store/auth.module";
import { getPokemon, PokemonResponse } from "@/service";
import PokemonCard from "./PokemonCard.vue";
import BaseLoader from "./BaseLoader.vue";

@Component({
  components: {
    PokemonCard,
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
}
</script>

<style lang="scss" scoped>
main {
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
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
