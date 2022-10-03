<template>
  <div class="wrapper">
    <input v-model="search" type="text" placeholder="Search" class="search" v-on:input="setQuery()" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

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
  transition: 1s;

  &:focus {
    box-shadow: 0 0 1px 1px #e63e3e;
    outline-width: 0px;
  }
}
</style>
