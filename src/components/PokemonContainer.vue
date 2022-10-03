<template>
  <div>
    <SearchSection class="search-section" @search="update($event)" />
    <BaseLoader v-if="loading" />
    <TransitionGroup name="list" tag="main">
      <PokemonCard v-for="pokemon in searchResults" :key="pokemon.name" :pokemon="pokemon" />
    </TransitionGroup>
    <p>{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PokemonCard from "./PokemonCard.vue";
import SearchSection from "../components/SearchSection.vue";
import BaseLoader from "./BaseLoader.vue";
import { getPokemonList, getPokemon, PokemonResponse } from "@/service";

@Component({
  components: {
    SearchSection,
    BaseLoader,
    PokemonCard,
  },
})
export default class PokemonContainer extends Vue {
  pokemons: PokemonResponse[] = [];
  error = "";
  loading = false;
  query = "";

  get searchResults() {
    return this.query ? this.pokemons.filter((pokemon) => pokemon.name.includes(this.query)) : this.pokemons;
  }

  update(value: string): void {
    this.query = value.toLocaleLowerCase();
  }

  async created() {
    try {
      this.loading = true;
      const { results } = await getPokemonList();

      let pokemonList = results;

      this.pokemons = await Promise.all(pokemonList.map((pokemon) => getPokemon(pokemon.name)));
    } catch (error) {
      this.error = (error as Error).message;
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.search-section {
  margin: 5rem 0;
}

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
</style>
