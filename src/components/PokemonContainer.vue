<template>
  <div id="pokemon-container">
    <SearchSection class="search-section" @search="update($event)" />
    <FiltersSection @filter="filter($event)" />
    <div v-if="loading" class="loader">
      <BaseLoader />
    </div>
    <div v-if="!error">
      <div>
        <VirtualScroll :pokemons="searchResults" />
      </div>
    </div>
    <p v-else class="error">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PokemonCard from "./PokemonCard.vue";
import SearchSection from "../components/SearchSection.vue";
import BaseLoader from "./BaseLoader.vue";
import { getPokemonList, getPokemon, PokemonResponse } from "@/service";
import FiltersSection from "./FiltersSection.vue";
import { pokemonStore } from "@/store/pokemon.module";
import VirtualScroll from "./VirtualScroll.vue";

@Component({
  components: {
    SearchSection,
    BaseLoader,
    PokemonCard,
    FiltersSection,
    VirtualScroll,
  },
})
export default class PokemonContainer extends Vue {
  pokemons: PokemonResponse[] = [];
  filteredPokemons: PokemonResponse[] = [];
  error = "";
  loading = false;
  query = "";

  get searchResults(): PokemonResponse[] {
    if (this.query && this.filteredPokemons.length) {
      const name = this.filteredPokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(this.query));
      const move = this.filteredPokemons.filter((pokemon) => pokemon.moves.some((item) => item.move.name.toLowerCase().includes(this.query)));

      const result = [...name, ...move];

      return Array.from(new Set(result));
    } else if (this.query && this.pokemons) {
      const name = this.pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(this.query));
      const move = this.pokemons.filter((pokemon) => pokemon.moves.some((item) => item.move.name.toLowerCase().includes(this.query)));

      const result = [...name, ...move];

      return Array.from(new Set(result));
    } else if (!this.filteredPokemons.length) {
      return this.pokemons;
    } else {
      return this.filteredPokemons;
    }
  }

  update(value: string) {
    this.query = value.toLocaleLowerCase();
  }

  filter(value: PokemonResponse[]) {
    this.filteredPokemons = value;
  }

  async created() {
    try {
      this.loading = true;
      const { results } = await getPokemonList();

      let pokemonList = results;

      this.pokemons = await Promise.all(pokemonList.map((pokemon) => getPokemon(pokemon.name)));

      pokemonStore.setPokemonList(this.pokemons);
    } catch (error) {
      this.error = (error as Error).message;
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style lang="scss" scoped>
#pokemon-container {
  position: relative;
}
.search-section {
  margin: 5rem 0;
}

.spacer {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.error {
  width: 100%;
  padding: 1rem;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 500;
}

.loader {
  width: 100%;
  position: absolute;
  z-index: 10;
}
</style>
