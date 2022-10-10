<template>
  <div class="wrapper">
    <input v-model="search" type="text" placeholder="Type a name or move" class="search" v-on:input="setQuery()" />
    <button class="filter-button" @click="openFilters">
      <i class="fas fa-filter"></i>
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { pokemonStore } from "@/store/pokemon.module";

@Component({
  components: {},
})
export default class SearchSection extends Vue {
  search = "";
  query = "";
  debounce = 0;

  setQuery() {
    this.query = "";
    clearTimeout(this.debounce);
    this.debounce = setTimeout(() => {
      this.query = this.search;
      this.$emit("search", this.query);
    }, 1000);
  }

  openFilters() {
    pokemonStore.openFilters();
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.search {
  width: 50%;
  min-width: 300px;
  padding: 1rem;
  outline: none;
  height: 25px;
  text-indent: 5px;
  font-size: 12.6pt;
  font-family: "Montserrat", sans-serif;
  border-radius: 5px;
  border: solid 1.5px #d3d3d3;
  transition: 0.3s ease-in-out;

  &:focus {
    box-shadow: 0 0 1px 1px #e63e3e;
    outline-width: 0px;
  }
}

.filter-button {
  height: 35px;
  width: 35px;
  margin-left: 5px;
  font-size: 12.6pt;
  font-family: "Montserrat", sans-serif;
  border-radius: 5px;
  border: solid 1.5px #d3d3d3;
  background-color: white;
  transition: 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #e63e3e;
    color: white;
  }

  &:active {
    transform: scale(0.9);
  }
}
</style>
