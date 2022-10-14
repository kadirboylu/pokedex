<template>
  <div class="root" :style="rootStyle">
    <div class="viewport" :style="viewportStyle">
      <div class="spacer" :style="spacerStyle">
        <div v-for="pokemon in visibleItems" :key="pokemon.name">
          <PokemonCard :pokemon="pokemon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { StyleValue } from "vue/types/jsx";
import PokemonCard from "./PokemonCard.vue";
import { PokemonResponse } from "@/service";

@Component({
  components: {
    PokemonCard,
  },
})
export default class VirtualScroll extends Vue {
  @Prop({ required: true }) pokemons!: PokemonResponse[];

  rootHeight = 540;
  rowHeight = 267;
  columnHeight = 235;
  scrollTop = 0;
  nodePadding = 20;
  viewportWidth = 0;

  mounted() {
    this.handleResize();
    const root = document.querySelector(".root") as HTMLElement;
    addEventListener("resize", this.handleResize);
    root.addEventListener("scroll", this.handleScroll);
  }

  beforeDestroy() {
    removeEventListener("resize", this.handleResize);
    removeEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
    const root = document.querySelector(".root") as HTMLElement;

    this.scrollTop = root.scrollTop;
  }

  handleResize() {
    const width = document.querySelector("#pokemon-container")?.clientWidth;
    this.viewportWidth = width ? width : 0;
  }

  get itemCount(): number {
    return this.pokemons.length;
  }

  get viewportHeight(): number {
    return (this.itemCount * this.rowHeight) / this.columnCount + this.rowHeight;
  }

  get columnCount(): number {
    return Math.floor(this.viewportWidth / this.columnHeight);
  }

  get startIndex(): number {
    let startNode = Math.floor(this.scrollTop / this.rowHeight) * this.columnCount;
    startNode = Math.max(0, startNode);
    return startNode;
  }

  get visibleNodeCount(): number {
    let count = Math.ceil(this.rootHeight / this.rowHeight) + 2 * this.nodePadding;
    count = Math.min(this.itemCount - this.startIndex, count);
    return count;
  }

  get visibleItems(): PokemonResponse[] {
    return this.pokemons.slice(this.startIndex, this.startIndex + this.visibleNodeCount);
  }

  get offsetY(): number {
    return (this.startIndex * this.rowHeight) / this.columnCount;
  }

  get spacerStyle(): StyleValue {
    return {
      transform: "translateY(" + this.offsetY + "px)",
    };
  }

  get viewportStyle(): StyleValue {
    return {
      overflow: "hidden",
      height: this.viewportHeight + "px",
      position: "relative",
    };
  }

  get rootStyle(): StyleValue {
    return {
      height: this.rootHeight + "px",
      overflow: "auto",
    };
  }
}
</script>

<style lang="scss" scoped>
.root {
  background-color: var(--color-400);
  border-radius: 5px;
}

.root::-webkit-scrollbar {
  width: 10px;
  background-color: transparent;
}

.root::-webkit-scrollbar-track {
  background: transparent;
}

.spacer {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.viewport {
  overflow-y: auto;
}
</style>
